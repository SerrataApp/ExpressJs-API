//@ts-nocheck

import { Request, Response, NextFunction } from 'express';
import { getGameMode, GameMode } from '../models/gameModeModel';

export const isModeOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modeIdOwner: number = req.body.gameModeId
        const gameMode: GameMode | null = await getGameMode(modeIdOwner);
        if (gameMode?.authorId === req.user.id) {
            return next();
        } else {
            return res.status(401).json({ error: "You do not have the right to modify the content of a game mode that is not yours." });
        }
    } catch {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}