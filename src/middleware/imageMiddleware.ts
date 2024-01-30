//@ts-nocheck


import { Request, Response, NextFunction } from 'express';
import { Image, getImage } from '../models/imageModels';

export const isImageOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imageId: number = parseInt(req.query.id as string, 10);
        const image: Image | null = await getImage(imageId);
        if (image?.authorId === req.user.id) {
            return next();
        } else {
            return res.status(401).json({ message: "You do not have the right to modify an image that is not yours." });
        }
    } catch {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}