import { Request, Response, NextFunction } from 'express';
import { GameMode, getGameMode } from '../models/gameModeModel';

export const isGameModeOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameModeId: number = parseInt(req.query.id as string, 10);
        const gameMode: GameMode | null = await getGameMode(gameModeId);
        if (gameMode?.authorId === req.user.id) {
            return next();
        } else {
            return res.status(401).json({ message: "Vous n'avez pas le droit modifier un mode de jeu qui n'est pas la votre." });
        }
    } catch {
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification des données" });
    }
}