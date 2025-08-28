import User from '../models/userModel.js';
import diaryModel from '../models/diaryModel.js';
import jwt from 'jsonwebtoken';

// ✅ Admin Login (hardcoded only)
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    if (email === 'hafizabd804@gmail.com' && password === 'admin') {
      const token = jwt.sign(
        {
          id: "admin",       // 👈 fake id to prevent .findById crash
          email,
          isAdmin: true
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ success: true, users });
};

// ✅ Get all diary entries
export const getAllEntries = async (req, res) => {
  const entries = await diaryModel.find().populate('userId', 'name email');
  res.json({ success: true, entries });
};

// ✅ Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ success: true, message: 'User deleted' });
};

// ✅ Delete diary entry
export const deleteEntry = async (req, res) => {
  const { id } = req.params;
  await diaryModel.findByIdAndDelete(id);
  res.json({ success: true, message: 'Diary entry deleted' });
};

// ✅ Promote user to admin (optional)
export const promoteToAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { isAdmin: true }, { new: true });
  res.json({ success: true, message: 'User promoted to admin', user });
};
