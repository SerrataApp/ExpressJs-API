//@ts-nocheck

import { Request, Response } from "express";
import { getGameMode, GameMode, createGameMode, updateGameMode, deleteGameMode, getAllImages } from "../../models/gameModeModel";

export const getGameModeController = async (req: Request, res: Response) => {
    try {
        const gameMode: GameMode | null = await getGameMode(parseInt(req.query.id as string, 10));
        if (!gameMode) {
            res.status(400).json({ error: 'This game mode doesn\'t exist' });
        } else {
            res.status(200).json({
                gameMode,
                message: "Recovered game mode"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during GameMode retrieval : ${error}` });
    }
}

export const getAllImagesController = async (req: Request, res: Response) => {
    try {
        const images = await getAllImages(parseInt(req.query.id as string, 10));
        if (images == null) {
            res.status(400).json({ error: 'This game mode doesn\'t exist' });
        } else {
            res.status(200).json({
                images,
                message: `Recovered images from game mode ${req.query.id}`
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during images retrieval : ${error}` });
    }
}

export const createGameModeController = async (req: Request, res: Response) => {
    try {
        let newGameMode: GameMode = req.body;
        newGameMode.authorId = req.user.id as number;
        const { id, name, description, authorId } = newGameMode
        newGameMode = { id, name, description, authorId }
        await createGameMode(newGameMode)
        res.status(201).json({ message: "Game mode created" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during GameMode creation : ${error}` });
    }
}

export const updateGameModeController = async (req: Request, res: Response) => {
    try {
        const GameModeId: number = parseInt(req.query.id as string, 10);
        let GameModeToUpdate: GameMode = req.body;
        const { id, name, description, authorId } = GameModeToUpdate
        GameModeToUpdate = { id, name, description, authorId }
        await updateGameMode(GameModeId, GameModeToUpdate)
        res.status(200).json({ message: "Game mode updated" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during GameMode update : ${error}` });
    }
}

export const deleteGameModeController = async (req: Request, res: Response) => {
    try {
        await deleteGameMode(parseInt(req.query.id as string, 10));
        res.status(200).json({ message: "Game mode deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during GameMode delete : ${error}` });
    }
}