import express, { Router, Request, Response } from "express";
import { authenticateUser, createUser } from "../dals/user-dal";
const verifyToken = require('../middleware/authMiddleware');
const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body)
        res.status(201).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', err: error })
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const auth = await authenticateUser(req.body)
        res.status(201).json({auth: auth})
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
})

export const userRouter: Router = router;