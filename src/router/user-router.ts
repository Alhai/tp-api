import express from 'express';
import {UserController} from '../controllers/user-controller';
// import { verifyToken } from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('/check-auth', UserController.me);
export default userRouter;
