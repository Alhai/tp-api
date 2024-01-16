import User from "../models/user.schema";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(userData: any): Promise<any> {
    try {
        const existUser = await User.findOne({ login: userData.identifier },
            'username email password')
        if (existUser) {
            throw new Error("User existing!");
        } else {
            const saltRounds = 10;
            const hash = await bcrypt.hash(userData.password, saltRounds);
            const savedUser = await User.create({ login: userData.identifier, password: hash });
            return savedUser;
        }
    } catch (error) {
        console.error("erreur dal :", error);
        throw new Error('Failed to create user');
    }
}

export async function authenticateUser(userData: any): Promise<any> {
    try {
        const existUser = await User.findOne({ login: userData.identifier },
            'login password _id')
        if (!existUser) {
            throw new Error("User not existing!");
        } else {
            const passwordMatch = await bcrypt.compare(userData.password, existUser.password);
            if (!passwordMatch) {
                throw new Error('Authentication failed');
            }
            const token = jwt.sign({ userID: existUser._id }, 'secret', { expiresIn: '1d' });
            return token
        }
    } catch (error) {
        console.error("erreur Authentification", error);
        throw new Error('Failed to authentification')
    }
}






