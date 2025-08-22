import { NlpManager } from 'node-nlp';
import diaryModel from '../models/diaryModel.js';

const manager = new NlpManager({ languages: ['en'], forceNER: true });

// Train intents
manager.addDocument('en', 'create a new diary', 'create.diary');
manager.addDocument('en', 'write diary', 'create.diary');
manager.addDocument('en', 'show my last entry', 'read.last');
manager.addDocument('en', 'what was my mood last week', 'mood.summary');

manager.addAnswer('en', 'create.diary', 'Sure! What would you like to write today?');
manager.addAnswer('en', 'read.last', 'Fetching your most recent diary entry...');
manager.addAnswer('en', 'mood.summary', 'Analyzing your recent moods...');

await manager.train();
manager.save();

export const handleVoiceCommand = async (req, res) => {
  const { command } = req.body;
  const userId = req.user._id;

  if (!command) return res.status(400).json({ success: false, message: 'Command is required' });

  const result = await manager.process('en', command);
  const intent = result.intent;

  // Response based on intent
  if (intent === 'read.last') {
    const lastEntry = await diaryModel.findOne({ userId }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      intent,
      response: lastEntry
        ? `Your last entry on ${lastEntry.createdAt.toDateString()} was: ${lastEntry.title}`
        : 'No diary entries found.',
    });
  }

  if (intent === 'mood.summary') {
    const last7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const entries = await diaryModel.find({ userId, createdAt: { $gte: last7 } });
    const moods = entries.map(e => e.mood);
    const summary = moods.reduce((acc, m) => {
      acc[m] = (acc[m] || 0) + 1;
      return acc;
    }, {});
    return res.json({ success: true, intent, response: summary });
  }

  return res.json({
    success: true,
    intent,
    response: result.answer || 'Command understood. What would you like to do next?',
  });
};
