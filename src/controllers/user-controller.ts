import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response } from 'express';
import User from "../models/user.schema";

export class UserController {
    static async me(req: Request, res: Response) {
        try {
            const token = req.headers.authorization!.split('Bearer ')[1];
            const decoded = jwt.decode(token) as { userID: string };
            if(decoded){
                const existUser = await User.findById(decoded.userID);
                console.log(existUser);
                res.json({decoded});
            } else {
                throw new Error('Token decoding failed');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server Error' });
        }
    }
}

