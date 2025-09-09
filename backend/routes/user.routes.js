import express from 'express';
import { getCurrentUser, updateUser, askToAssistant } from '../controllers/user.controller.js';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.get('/current', isAuth, getCurrentUser);
userRouter.post('/update', isAuth,upload.single("assistantImage"), updateUser);
userRouter.post('/asktoassistant', isAuth, askToAssistant);

export default userRouter;
