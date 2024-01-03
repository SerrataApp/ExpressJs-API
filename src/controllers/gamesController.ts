import { Request, Response } from "express";
import { getGame, createGame, GameInDb, Game } from "../models/gameModel";

export const getGameController = async (req: Request, res: Response) => {
    try {
        const game_id: number = parseInt(req.query.id as string, 10);
        const game: GameInDb | null = await getGame(game_id);

        if (!game) {
            return res.status(404).json({ error: 'Partie introuvable' });
        }

        res.status(200).json({
            game,
            message: "Partie récupérée"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la partie' });
    }
}

export const createGameController = async (req: Request, res: Response) => {
    try {
        const newGame: Game = req.body;

        const game: Game | null = await createGame(newGame);
        res.status(201).json({
            game,
            message: "Partie créée"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
}