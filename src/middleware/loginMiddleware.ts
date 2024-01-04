import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserCreate } from '../models/userModel';

dotenv.config();

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] as string;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as { user: UserCreate };
        req.user = decodedToken.user;
        return next();
    } catch (error: Error | any) {
        console.error("Erreur de vérification du jeton :", error.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
}