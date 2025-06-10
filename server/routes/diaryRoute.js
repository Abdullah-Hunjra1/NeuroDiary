import express from 'express';
import { createDiary, getUserDiaries, deleteDiary } from '../controllers/diaryController.js';
import authUser from '../middlewares/authUser.js';

const diaryRouter = express.Router();

diaryRouter.post('/create', authUser, createDiary);
diaryRouter.get('/my-entries', authUser, getUserDiaries);
diaryRouter.delete('/delete/:id', authUser, deleteDiary);

export default diaryRouter;
