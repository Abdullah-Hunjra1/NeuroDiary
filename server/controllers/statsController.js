
import diaryModel from '../models/diaryModel.js';
import mongoose from 'mongoose';

// Basic mood frequency
export const getMoodStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await diaryModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$mood', count: { $sum: 1 } } },
    ]);

    const moodStats = {};
    result.forEach((item) => {
      if (item._id) moodStats[item._id] = item.count;
    });

    res.json({ success: true, moodStats });
  } catch (error) {
    console.error('Mood Stats Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve mood stats' });
  }
};

// Mood trend over time (grouped by day)
export const getMoodTimeline = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await diaryModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            mood: '$mood',
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.date': 1 } },
    ]);

    const timeline = {};
    result.forEach(({ _id, count }) => {
      if (!timeline[_id.date]) timeline[_id.date] = {};
      timeline[_id.date][_id.mood] = count;
    });

    res.json({ success: true, timeline });
  } catch (error) {
    console.error('Timeline Stats Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve timeline stats' });
  }
};