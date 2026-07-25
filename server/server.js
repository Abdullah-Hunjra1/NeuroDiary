import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import diaryRouter from "./routes/diaryRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import recommendationRouter from "./routes/recommendationRoute.js";
import contactRouter from "./routes/contactRoute.js";
import statsRouter from "./routes/statsRoute.js";
import insightsRouter from "./routes/insightsRoute.js";
import voiceRouter from "./routes/voiceRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

// Connect services
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Routes
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/recommendations", recommendationRouter);
app.use("/api", contactRouter);
app.use("/api/stats", statsRouter);
app.use("/api/insights", insightsRouter);
app.use("/api", voiceRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("NeuroDiary API is working!");
});

export default app;