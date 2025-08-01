import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import diaryRouter from './routes/diaryRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import recommendationRouter from './routes/recommendationRoute.js';
import contactRouter from './routes/contactRoute.js';
import statsRouter from './routes/statsRoute.js';
import voiceRouter from './routes/voiceRoute.js';




import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Admin
// import adminRouter from './routes/adminRoute.js';

//app config
const app = express();
const port = process.env.PORT || 5000;

connectDB()
connectCloudinary()

//middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/diary', diaryRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/recommendations', recommendationRouter);
app.use('/api', contactRouter);
app.use('/api/stats', statsRouter);
app.use('/api', voiceRouter);



// Admin
// app.use('/api/admin', adminRouter);


app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, ()=> console.log("Server Started", port))