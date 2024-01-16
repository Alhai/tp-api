import express, { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user.schema";
import jwt from "jsonwebtoken";

const verifyToken = require('../middleware/authMiddleware');
const router: Router = express.Router();

router.post('/auth/add', async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ login, password: hashedPassword });
        console.log("req body", req.body)
        await user.save();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', err: error })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
 const user = await User.findOne({ username });
 if (!user) {
 return res.status(401).json({ error: 'Authentication failed' });
 }
 const passwordMatch = await bcrypt.compare(password, user.password);
 if (!passwordMatch) {
 return res.status(401).json({ error: 'Authentication failed' });
 }
 const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
 expiresIn: '1h',
 });
 res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
})

export const userRouter: Router = router;