import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response } from 'express';
import User from "../models/user.schema";

export class AuthController {

    static async createUser(req: Request, res: Response) {
        const { username, password, email } = req.body;
    try {
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            res.status(400).json("User already exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
            const newUser = new User({ username, password: hashedPassword, email });
            await newUser.save();
            res.json(newUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
    }

    static async loginUser(req: Request, res: Response) {
        const { identifier, password } = req.body;
    try {
        const userId = await User.findOne({ _id: identifier });
        if (!userId) {
            res.status(400).json("Password is incorrect");
        } else {
            const userPassword = userId.password ? userId.password.toString() : null;
            if (userPassword) {
                const isPasswordCorrect = await bcrypt.compare(password, userPassword);
                if (isPasswordCorrect) {
                    const payload = {
                        id: userId._id,
                        username: userId.login,
                        password: userId.password,
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
                    res.json({
                        token,
                        ...payload
                    });
                } else {
                    res.status(400).json("Password is incorrect");
                }
            } else {
                res.status(400).json("Password is incorrect");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
    }
}