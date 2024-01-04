import { Request, Response, NextFunction } from 'express';
import { GameInDb, getGame } from '../models/gameModel';

export const isGameOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game_id: number = parseInt(req.query.id as string, 10);
        const game: GameInDb | null = await getGame(game_id);
        if (game?.playerId === req.user.id) {
            return next();
        } else {
            return res.status(401).json({ message: "Vous n'avez pas le droit modifier une partie qui n'est pas la votre." });
        }
    } catch {
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification des données" });
    }
}