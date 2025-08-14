import express from 'express';
import { getAIInsights, queryInsight } from '../controllers/insightsController.js';
import authUser from '../middlewares/authUser.js';

const insightsRouter = express.Router();

insightsRouter.get('/', authUser, getAIInsights);
insightsRouter.post('/query', authUser, queryInsight);

export default insightsRouter;
