import express from 'express';
import { getRecommendationByMood, getRecommendationByText } from '../controllers/recommendationController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.get('/', authUser, getRecommendationByMood);       // GET ?mood=happy
router.post('/', authUser, getRecommendationByText);      // POST { entry: "..." }

export default router;
