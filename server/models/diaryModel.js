import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  entry: {
    type: String,
    required: true,
  },
  mood: {
    type: String, // e.g., "Happy", "Sad", "Anxious"
  },
  sentimentScore: {
    type: Number, // e.g., result from AI sentiment analysis
  },
  recommendations: {
  writingPrompt: String,
  activity: String,
  message: String,
 },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const diaryModel = mongoose.models.diary || mongoose.model('diaries', diarySchema);

export default diaryModel;
