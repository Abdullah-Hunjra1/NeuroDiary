import express from 'express';
import authUser from '../middlewares/authUser.js';
import { createSubscription } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-subscription', authUser, createSubscription);

export default paymentRouter;
