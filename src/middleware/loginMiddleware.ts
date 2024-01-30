import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserCreate } from '../models/userModel';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addGitHubIssue } from '../utils/githubIssues';

dotenv.config();

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] as string;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as { user: UserCreate };
        //@ts-ignore
        req.user = decodedToken.user;
        return next();
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}