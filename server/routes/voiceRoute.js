import express from 'express';
import { handleVoiceCommand } from '../controllers/voiceController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/voice-command', authUser, handleVoiceCommand);

export default router;
