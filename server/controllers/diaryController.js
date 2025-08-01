import diaryModel from '../models/diaryModel.js';
import { analyzeSentiment } from '../services/openaiService.js';


// Create new diary entry

const createDiary = async (req, res) => {
  try {
    const { title, entry, mood , recommendations } = req.body;
    const userId = req.user.userId;

    // Analyze the entry text
    const aiResult = await analyzeSentiment(entry);

    let sentimentScore = null;
    let aiMood = mood;

    if (aiResult) {
      // Try parsing the AI response, example expected: "Mood: Anxious, Score: -0.6"
      const match = aiResult.match(/Mood:\s*(.+?),\s*Score:\s*(-?\d+(\.\d+)?)/i);
      if (match) {
        aiMood = match[1].trim();
        sentimentScore = parseFloat(match[2]);
      }
      console.log("AI Response:", aiResult);

    }

    const newEntry = new diaryModel({
      userId,
      title,
      entry,
      mood: aiMood,
      sentimentScore,
      recommendations, // 👈 from AI
    });

    await newEntry.save();

    res.json({ success: true, message: 'Diary entry created', entry: newEntry });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// Get all entries for logged-in user
const getUserDiaries = async (req, res) => {
  try {
    const userId = req.user.userId;
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
    const userId = req.user.userId;

    const deleted = await diaryModel.findOneAndDelete({ _id: id, userId });

    if (!deleted) return res.json({ success: false, message: 'Entry not found' });

    res.json({ success: true, message: 'Entry deleted' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { createDiary, getUserDiaries, deleteDiary };
