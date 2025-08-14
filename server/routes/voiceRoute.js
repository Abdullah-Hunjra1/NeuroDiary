import express from 'express';
import { handleVoiceCommand } from '../controllers/voiceController.js';
import authUser from '../middlewares/authUser.js';
import isPremium from '../middlewares/isPremium.js';

const router = express.Router();

router.post('/voice-command', authUser, isPremium , handleVoiceCommand);

export default router;
