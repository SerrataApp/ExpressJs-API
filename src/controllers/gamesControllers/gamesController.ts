import { Request, Response } from "express";
import { getGame, createGame, GameInDb, Game, deleteGameMe, getAllUserGames, getGames, getGamesByGameMode, updateGameState } from "../../models/gameModel";
import { getPlayerIdByUsername } from "../../models/userModel";

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
        newGame.playerId = await getPlayerIdByUsername(req.user.username) as number;

        await createGame(newGame);
        res.status(201).json({
            message: "Partie créée"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la partie' });
    }
}

export const deleteGameController = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.query.id as string, 10);

        await deleteGameMe(gameId, req.user.id);
        res.status(201).json({
            message: "Partie supprimée"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la partie' });
    }
}

export const getAllUserGamesController = async (req: Request, res: Response) => {
    try {
        const games: [] = await getAllUserGames(req.query.username as string);
        res.status(201).json({
            total: games?.length,
            games,
            message: `Parties de l'utilisateur ${req.query.username}`
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des parties de l\'utilisateur' });
    }
}

export const getGamesController = async (req: Request, res: Response) => {
    try {
        const games: [Game] | [] = await getGames(parseInt(req.query.skip as string, 10), parseInt(req.query.limit as string, 10));
        res.status(201).json({
            total: games?.length,
            games,
            message: 'Parties récupérées'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des parties' });
    }
}

export const getGamesByGameModeController = async (req: Request, res: Response) => {
    try {
        const games = await getGamesByGameMode(parseInt(req.query.gamemode as string, 10));
        res.status(201).json({
            total: games?.length,
            games,
            message: 'Parties récupérées'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Erreur lors de la récupération des parties du mode de jeu numéro ${req.query.gamemode}` });
    }
}

export const updateGameStateController = async (req: Request, res: Response) => {
    try {
        await updateGameState(parseInt(req.query.id as string, 10))
        res.status(201).json({
            message: 'Partie mise à jour'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Erreur lors de la modification de la partie` });
    }
}