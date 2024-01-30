//@ts-nocheck

import { Request, Response, NextFunction } from 'express';
import { GameMode, getGameMode } from '../models/gameModeModel';

export const isGameModeOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameModeId: number = parseInt(req.query.id as string, 10);
        const gameMode: GameMode | null = await getGameMode(gameModeId);
        if (gameMode?.authorId === req.user.id) {
            return next();
        } else {
            return res.status(401).json({ message: "You are not allowed to modify a game mode that is not yours." });
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