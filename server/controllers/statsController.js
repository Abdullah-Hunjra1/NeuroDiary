import diaryModel from '../models/diaryModel.js';
import mongoose from 'mongoose';

// Basic mood frequency (Pie chart)
export const getMoodStats = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    if (!userId) return res.status(400).json({ success: false, message: 'No user id' });

    const result = await diaryModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$mood', count: { $sum: 1 } } },
    ]);

    const moodStats = {};
    result.forEach((item) => {
      if (item._id) moodStats[item._id] = item.count;
    });
    return res.json({ success: true, moodStats });
  } catch (error) {
    console.error('Mood Stats Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve mood stats' });
  }
};


// Mood trend over time (grouped by day) -> normalized and returned as { success:true, timeline }
export const getMoodTimeline = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    if (!userId) return res.status(400).json({ success: false, message: 'No user id' });

    // Whitelist / canonical moods (frontend uses these colors/emojis)
    const allowedMoods = [
      "Happy",
      "Sad",
      "Anxious",
      "Angry",
      "Neutral",
      "Grateful",
      "Excited",
      "Calm",
      "Stressed"
    ];

    // Fetch diaries for this user (only mood + createdAt)
    const diaries = await diaryModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { mood: 1, createdAt: 1 }
    ).lean();

    const timeline = {};

    diaries.forEach((entry) => {
      if (!entry || !entry.createdAt) return;
      const date = new Date(entry.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD

      if (!timeline[date]) {
        timeline[date] = {};
        allowedMoods.forEach(m => (timeline[date][m] = 0));
      }

      const raw = (entry.mood || '').toString().trim();
      if (!raw) return;

      // Match ignoring case to one of allowedMoods
      const normalized = allowedMoods.find(m => m.toLowerCase() === raw.toLowerCase());
      if (normalized) timeline[date][normalized] += 1;
      // else ignore moods not in allowed list (e.g., "Positive")
    });

    console.log("Raw timeline from backend:", timeline);

    // Always return object shaped response your frontend expects
    return res.json({ success: true, timeline });
  } catch (error) {
    console.error("Timeline Stats Error:", error);
    return res.status(500).json({ success: false, message: "Error fetching timeline stats" });
  }
};
