import express from 'express';
import { AuthController } from '../controllers/auth-controller';

const authRouter = express.Router();

authRouter.post('/add', AuthController.createUser);
authRouter.post('/connect', AuthController.loginUser);
export default authRouter;
