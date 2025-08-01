// import User from '../models/userModel.js';
// import diaryModel from '../models/diaryModel.js';

// // Get all users
// export const getAllUsers = async (req, res) => {
//   const users = await User.find().select('-password');
//   res.json({ success: true, users });
// };

// // Get all diary entries
// export const getAllEntries = async (req, res) => {
//   const entries = await diaryModel.find().populate('userId', 'name email');
//   res.json({ success: true, entries });
// };

// // Delete user
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   await User.findByIdAndDelete(id);
//   res.json({ success: true, message: 'User deleted' });
// };

// // Delete diary entry
// export const deleteEntry = async (req, res) => {
//   const { id } = req.params;
//   await diaryModel.findByIdAndDelete(id);
//   res.json({ success: true, message: 'Diary entry deleted' });
// };

// // Promote user to admin (optional)
// export const promoteToAdmin = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndUpdate(id, { isAdmin: true }, { new: true });
//   res.json({ success: true, message: 'User promoted to admin', user });
// };
