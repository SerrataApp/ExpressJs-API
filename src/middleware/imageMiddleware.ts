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
            return res.status(401).json({ message: "Vous n'avez pas le droit modifier une image qui n'est pas la votre." });
        }
    } catch {
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification des données" });
    }
}