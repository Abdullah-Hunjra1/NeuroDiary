import express from 'express';
import { getMoodStats, getMoodTimeline } from '../controllers/statsController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.get('/mood', authUser, getMoodStats);
router.get('/timeline', authUser, getMoodTimeline);

export default router;
