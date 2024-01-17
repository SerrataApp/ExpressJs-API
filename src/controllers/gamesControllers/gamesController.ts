//@ts-nocheck

import { Request, Response } from "express";
import { getGame, createGame, GameInDb, Game, deleteGameMe, getAllUserGames, getGames, getGamesByGameMode, updateGameState } from "../../models/gameModel";
import { getPlayerIdByUsername } from "../../models/userModel";

export const getGameController = async (req: Request, res: Response) => {
    try {
        const game_id: number = parseInt(req.query.id as string, 10);
        const game: GameInDb | null = await getGame(game_id);

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.status(200).json({
            game,
            message: "Recovered game"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const deleteGameController = async (req: Request, res: Response) => {
    try {
        const gameId: number = parseInt(req.query.id as string, 10);

        await deleteGameMe(gameId, req.user.id);
        res.status(201).json({
            message: "Deleted game"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getAllUserGamesController = async (req: Request, res: Response) => {
    try {
        const games: [] = await getAllUserGames(req.query.username as string);
        res.status(201).json({
            total: games?.length,
            games,
            message: `User games ${req.query.username}`
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getGamesController = async (req: Request, res: Response) => {
    try {
        const games: [Game] | [] = await getGames(parseInt(req.query.skip as string, 10), parseInt(req.query.limit as string, 10));
        res.status(201).json({
            total: games?.length,
            games,
            message: 'Recovered game'
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getGamesByGameModeController = async (req: Request, res: Response) => {
    try {
        const games = await getGamesByGameMode(parseInt(req.query.gamemode as string, 10));
        res.status(201).json({
            total: games?.length,
            games,
            message: 'Recovered game'
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const updateGameStateController = async (req: Request, res: Response) => {
    try {
        await updateGameState(parseInt(req.query.id as string, 10))
        res.status(201).json({
            message: 'Game updated'
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}