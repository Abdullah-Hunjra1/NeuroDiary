import diaryModel from '../models/diaryModel.js';
import groqProvider from '../providers/groqProvider.js';

// Create new diary entry
const createDiary = async (req, res) => {
  try {
    const { title, entry, mood } = req.body;
    const userId = req.user._id;

    const groqResponse = await groqProvider.generate({
      prompt: `Analyze this diary entry.

Return ONLY in this exact format:
Mood: <one mood from the allowed list>, Score: <number from 1 to 10>

Allowed moods:
Happy, Sad, Anxious, Angry, Neutral, Grateful, Excited, Calm, Stressed

Score meaning:
1 = extremely negative
2 = very negative
3 = negative
4 = slightly negative
5 = neutral
6 = slightly positive
7 = positive
8 = very positive
9 = extremely positive
10 = exceptionally positive

Choose the mood that best represents the overall emotional state of the entry.
The score must ALWAYS be a whole number between 1 and 10.

Entry:
${entry}`
    }, { max_tokens: 300 });

    const aiResult = groqResponse.text;
    let sentimentScore = null;
    let aiMood = mood;

    if (aiResult) {
      const match = aiResult.match(/Mood:\s*(.+?),\s*Score:\s*(-?\d+(\.\d+)?)/i);
      if (match) {
        aiMood = match[1].trim();
        sentimentScore = parseFloat(match[2]);
      }
      console.log("AI Sentiment Response:", aiResult);
    }

    // ✅ 2. Generate recommendations from Groq
    let recommendations;
    try {
      const recResponse = await groqProvider.generate({
        prompt: `You are a mental health assistant. Based on the diary entry, respond ONLY in JSON with 3 keys: "writingPrompt", "activity", and "message".

        Diary entry:
        ${entry}`
      }, { max_tokens: 250 });

      recommendations = JSON.parse(recResponse.text);
    } catch (err) {
      console.error("Recommendation generation failed:", err.message);
      recommendations = {
        writingPrompt: "Reflect on a time when you overcame a difficult situation.",
        activity: "Write down three positive things from today.",
        message: "You are doing better than you think."
      };
    }

    // ✅ 3. Save diary with recommendations
    const newEntry = new diaryModel({
      userId,
      title,
      entry,
      mood: aiMood,
      sentimentScore,
      recommendations
    });

    await newEntry.save();

    res.json({ success: true, message: 'Diary entry created', entry: newEntry });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// Get all entries for logged-in user
const getUserDiaries = async (req, res) => {
  try {
    const userId = req.user._id;
    const entries = await diaryModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, entries });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete an entry
const deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deleted = await diaryModel.findOneAndDelete({ _id: id, userId });
    if (!deleted) return res.json({ success: false, message: 'Entry not found' });

    res.json({ success: true, message: 'Entry deleted' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { createDiary, getUserDiaries, deleteDiary };
