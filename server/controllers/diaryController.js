// import diaryModel from '../models/diaryModel.js';
// import groqProvider from '../providers/groqProvider.js';


// // Create new diary entry

// const createDiary = async (req, res) => {
//   try {
//     const { title, entry, mood, recommendations } = req.body;
//     const userId = req.user.userId;

//     // Analyze the entry text
//     const groqResponse = await groqProvider.generate({
//       prompt: `Analyze this diary entry and return in format: Mood: <mood>, Score: <number>

//       Entry:
//       ${entry}`
//     });
//     const aiResult = groqResponse.text;


//     let sentimentScore = null;
//     let aiMood = mood;

//     if (aiResult) {
//       // Try parsing the AI response, example expected: "Mood: Anxious, Score: -0.6"
//       const match = aiResult.match(/Mood:\s*(.+?),\s*Score:\s*(-?\d+(\.\d+)?)/i);
//       if (match) {
//         aiMood = match[1].trim();
//         sentimentScore = parseFloat(match[2]);
//       }
//       console.log("AI Response:", aiResult);

//     }

//     const newEntry = new diaryModel({
//       userId,
//       title,
//       entry,
//       mood: aiMood,
//       sentimentScore,
//       recommendations, // 👈 from AI
//     });

//     await newEntry.save();

//     res.json({ success: true, message: 'Diary entry created', entry: newEntry });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };



// // Get all entries for logged-in user
// const getUserDiaries = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const entries = await diaryModel.find({ userId }).sort({ createdAt: -1 });

//     res.json({ success: true, entries });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// // Delete an entry
// const deleteDiary = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.userId;

//     const deleted = await diaryModel.findOneAndDelete({ _id: id, userId });

//     if (!deleted) return res.json({ success: false, message: 'Entry not found' });

//     res.json({ success: true, message: 'Entry deleted' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export { createDiary, getUserDiaries, deleteDiary };







import diaryModel from '../models/diaryModel.js';
import groqProvider from '../providers/groqProvider.js';

// Create new diary entry
// const createDiary = async (req, res) => {
//   try {
//     const { title, entry, mood, recommendations } = req.body;
//     const userId = req.user.userId;

//     // Analyze the entry text using Groq
//     const groqResponse = await groqProvider.generate({
//       prompt: `Analyze this diary entry and return in the exact format: Mood: <mood>, Score: <number>

//       Entry:
//       ${entry}`
//     }, { max_tokens: 300 });

//     const aiResult = groqResponse.text;
//     let sentimentScore = null;
//     let aiMood = mood;

//     if (aiResult) {
//       // Try parsing the AI response, example: "Mood: Anxious, Score: -0.6"
//       const match = aiResult.match(/Mood:\s*(.+?),\s*Score:\s*(-?\d+(\.\d+)?)/i);
//       if (match) {
//         aiMood = match[1].trim();
//         sentimentScore = parseFloat(match[2]);
//       }
//       console.log("AI Response:", aiResult);
//     }

//     const newEntry = new diaryModel({
//       userId,
//       title,
//       entry,
//       mood: aiMood,
//       sentimentScore,
//       recommendations // from AI or user
//     });

//     await newEntry.save();

//     res.json({ success: true, message: 'Diary entry created', entry: newEntry });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };


const createDiary = async (req, res) => {
  try {
    const { title, entry, mood } = req.body;
    const userId = req.user._id;

    // ✅ 1. Analyze mood & sentiment
    const groqResponse = await groqProvider.generate({
      prompt: `Analyze this diary entry and return in the exact format: Mood: <mood>, Score: <number>
      
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
