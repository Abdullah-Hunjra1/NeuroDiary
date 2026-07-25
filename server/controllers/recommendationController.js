import groqProvider from '../providers/groqProvider.js';

// Helper function to safely parse AI JSON
const parseAIJson = (text) => {
  if (!text) {
    throw new Error("Empty AI response");
  }

  let cleaned = text.trim();

  // Remove ```json and ``` if AI adds markdown
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");

  // Find JSON object if AI adds extra text
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No valid JSON found in AI response");
  }

  cleaned = cleaned.substring(start, end + 1);

  return JSON.parse(cleaned);
};


// ==========================================
// GET /api/recommendations?mood=happy
// ==========================================

export const getRecommendationByMood = async (req, res) => {
  const { mood } = req.query;

  if (!mood) {
    return res.status(400).json({
      success: false,
      message: "Mood is required in query",
    });
  }

  try {
    const groqResponse = await groqProvider.generate(
      {
        prompt: `You are a mental health assistant.

Based on the user's mood, generate personalized recommendations.

Return ONLY a valid JSON object.
Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT add any explanation before or after the JSON.

The JSON must have exactly these 3 keys:

{
  "writingPrompt": "A thoughtful journaling prompt",
  "activity": "A simple activity the user can do",
  "message": "A short supportive message"
}

User's mood:
${mood}`,
      },
      { max_tokens: 250 }
    );

    const raw = groqResponse.text;

    console.log("Mood Recommendation AI Response:", raw);

    const recommendations = parseAIJson(raw);

    return res.json({
      success: true,
      recommendations,
    });

  } catch (error) {
    console.error("Mood Recommendation Error:", error.message);

    // Fallback recommendation
    const fallback = {
      writingPrompt: "Write about what may be influencing your current mood.",
      activity: "Take a few minutes to relax and focus on your breathing.",
      message: "Your feelings are valid. Take things one step at a time.",
    };

    return res.status(200).json({
      success: true,
      recommendations: fallback,
      note: "Fallback recommendation used",
    });
  }
};


// ==========================================
// POST /api/recommendations
// Body: { entry: "..." }
// ==========================================

export const getRecommendationByText = async (req, res) => {
  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({
      success: false,
      message: "Diary entry is required in request body",
    });
  }

  try {
    const groqResponse = await groqProvider.generate(
      {
        prompt: `You are a mental health assistant.

Based on the following diary entry, generate personalized recommendations.

Return ONLY a valid JSON object.
Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT add any explanation before or after the JSON.

The JSON must have exactly these 3 keys:

{
  "writingPrompt": "Describe a moment when you felt hopeful.",
  "activity": "Take a short walk and observe your surroundings.",
  "message": "You have the strength to get through tough times."
}

Diary entry:
${entry}`,
      },
      { max_tokens: 250 }
    );

    const raw = groqResponse.text;

    console.log("Text Recommendation AI Response:", raw);

    const recommendations = parseAIJson(raw);

    return res.json({
      success: true,
      recommendations,
    });

  } catch (error) {
    console.error("Text Recommendation Error:", error.message);

    // Fallback recommendation
    const fallback = {
      writingPrompt: "Reflect on a time when you overcame a difficult situation.",
      activity: "Write down three positive things from today.",
      message: "You are doing better than you think.",
    };

    return res.status(200).json({
      success: true,
      recommendations: fallback,
      note: "Fallback recommendation used",
    });
  }
};