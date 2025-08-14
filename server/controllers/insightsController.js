import Diary from '../models/diaryModel.js';
import groqProvider from '../providers/groqProvider.js';

const MAX_ENTRIES = parseInt(process.env.MAX_ENTRIES_TO_ANALYZE || '50', 10);

function extractJson(text) {
  if (!text) throw new Error('Empty AI response');
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error('Unable to parse JSON from AI output');
  }
}

function buildAnalyzePrompt(entries) {
  const reduced = entries.map(e => ({
    date: new Date(e.createdAt).toISOString().slice(0, 10),
    mood: e.mood || 'Neutral',
    text: (e.entry || '').slice(0, 1000)
  }));

  return `Analyze the following diary entries and return STRICT JSON ONLY matching this schema:
{
  "overallMood": "short phrase",
  "moodTrends": { "Happy": 0, "Sad": 0 },
  "keyConcerns": ["short phrase"],
  "positiveChanges": ["short phrase"],
  "recommendations": ["short actionable recommendation"],
  "summary": "short paragraph",
  "highlights": [{ "date": "YYYY-MM-DD", "quote": "short quote" }]
}

Entries:
${JSON.stringify(reduced)}`;
}

export const getAIInsights = async (req, res) => {
  try {
    const userId = req.user.userId;

    const entries = await Diary.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(MAX_ENTRIES)
      .select('createdAt mood entry')
      .lean();

    if (!entries.length) {
      return res.json({
        overallMood: 'No entries',
        moodTrends: {},
        keyConcerns: [],
        positiveChanges: [],
        recommendations: [],
        summary: 'You have not written any diary entries yet.',
        highlights: []
      });
    }

    const prompt = buildAnalyzePrompt(entries);

    const { text } = await groqProvider.generate(
      { prompt },
      { max_tokens: 800, temperature: 0.2 }
    );

    const parsed = extractJson(text.trim());

    return res.json({
      overallMood: parsed.overallMood || 'Mixed',
      moodTrends: parsed.moodTrends || {},
      keyConcerns: parsed.keyConcerns || [],
      positiveChanges: parsed.positiveChanges || [],
      recommendations: parsed.recommendations || [],
      summary: parsed.summary || '',
      highlights: parsed.highlights || []
    });
  } catch (err) {
    console.error('getAIInsights error', err);
    return res.status(500).json({ error: 'Failed to build AI insights' });
  }
};

export const queryInsight = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const entries = await Diary.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('createdAt mood entry')
      .lean();

    const context = entries.map(e => ({
      date: new Date(e.createdAt).toISOString().slice(0, 10),
      mood: e.mood || 'Neutral',
      text: (e.entry || '').slice(0, 800)
    }));

    const prompt = `The user asks: "${question}".
Here are their recent diary entries (date, mood, text): ${JSON.stringify(context)}
Answer concisely and provide 3 actionable suggestions.`;

    const { text } = await groqProvider.generate(
      { prompt },
      { max_tokens: 600, temperature: 0.3 }
    );

    return res.json({ reply: text.trim() });
  } catch (err) {
    console.error('queryInsight error', err);
    return res.status(500).json({ error: 'AI query failed' });
  }
};
