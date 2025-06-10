import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
// import diaryRouter from './routes/diaryRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import contactRoute from './routes/contactRoute.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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
// app.use('/api/diary', diaryRouter);
app.use('/api/payment', paymentRouter);
app.use('/api', contactRoute);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, ()=> console.log("Server Started", port))