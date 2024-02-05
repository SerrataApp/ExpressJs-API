import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyTokenResetToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        jwt.verify(req.params.token, process.env.PASS_RESET_SECRET as string, { algorithms: ["HS256"] });

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}