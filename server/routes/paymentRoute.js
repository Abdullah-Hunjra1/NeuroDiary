import express from "express";
import authUser from '../middlewares/authUser.js';

import { createCheckoutSession, webhookHandler, verifyCheckoutSession } from "../controllers/paymentController.js";

const paymentRouter = express.Router();


paymentRouter.post("/create-checkout-session", authUser, createCheckoutSession);
paymentRouter.get("/verify-session", authUser, verifyCheckoutSession);
paymentRouter.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);


export default paymentRouter;