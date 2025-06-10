// server/routes/contactRoute.js

import express from 'express';
import { contactForm } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/contact', contactForm);

export default contactRouter;
