import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ GET /api/recommendations?mood=happy
export const getRecommendationByMood = async (req, res) => {
  const { mood } = req.query;

  if (!mood) {
    return res.status(400).json({ success: false, message: 'Mood is required in query' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a mental health assistant. Based on the user's mood, respond ONLY in JSON with 3 keys: "writingPrompt", "activity", and "message".`,
        },
        {
          role: 'user',
          content: `My mood is: ${mood}`,
        },
      ],
    });

    const raw = response.choices[0].message.content;

    let recommendations;
    try {
      recommendations = JSON.parse(raw);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'AI response parsing failed', raw });
    }

    res.json({ success: true, recommendations });
  } catch (error) {
    console.error('OpenAI Error:', error.message);

    const fallback = {
      writingPrompt: 'Write about something you’re grateful for today.',
      activity: 'Take a 5-minute break and do some deep breathing.',
      message: 'Progress is progress, no matter how small.',
    };

    res.status(200).json({ success: true, recommendations: fallback, note: 'Fallback used due to OpenAI error' });
  }
};

// ✅ POST /api/recommendations  { entry: "..." }
export const getRecommendationByText = async (req, res) => {
  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({ success: false, message: 'Diary entry is required in request body' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a mental health assistant. Based on the diary entry, respond ONLY in JSON with 3 keys: "writingPrompt", "activity", and "message". Example:

{
  "writingPrompt": "Describe a moment when you felt hopeful.",
  "activity": "Take a short walk and observe your surroundings.",
  "message": "You have the strength to get through tough times."
}`,
        },
        {
          role: 'user',
          content: `Here is my diary entry:\n${entry}`,
        },
      ],
    });

    const raw = response.choices[0].message.content;

    let recommendations;
    try {
      recommendations = JSON.parse(raw);
    } catch (jsonError) {
      return res.status(500).json({
        success: false,
        message: 'AI response could not be parsed. Please try again.',
        raw,
      });
    }

    res.json({ success: true, recommendations });
  } catch (error) {
    console.error('OpenAI Error:', error.message);

    const fallback = {
      writingPrompt: 'Reflect on a time when you overcame a difficult situation.',
      activity: 'Write down three positive things from today.',
      message: 'You are doing better than you think.',
    };

    res.status(200).json({
      success: true,
      recommendations: fallback,
      note: 'Fallback used due to API error',
    });
  }
};
