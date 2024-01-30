//@ts-nocheck

import { Request, Response, NextFunction } from 'express';
import { GameInDb, getGame } from '../models/gameModel';

export const isGameOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game_id: number = parseInt(req.query.id as string, 10);
        const game: GameInDb | null = await getGame(game_id);
        if (game?.playerId === req.user.id) {
            return next();
        } else {
            return res.status(401).json({ message: "You are not allowed to modify a part that is not yours." });
        }
    } catch {
        if (error instanceof PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}