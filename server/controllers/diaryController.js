import diaryModel from '../models/diaryModel.js';

// Create new diary entry
const createDiary = async (req, res) => {
  try {
    const { title, entry, mood } = req.body;
    const userId = req.user.userId;

    const newEntry = new diaryModel({ userId, title, entry, mood });
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
