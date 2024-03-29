//@ts-nocheck

import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { addGitHubIssue } from "../../utils/githubIssues";
import { getGameMode, GameMode, createGameMode, updateGameMode, deleteGameMode, getAllImages } from "../../models/gameModeModel";
import { createImage, getAllImagesByUUID } from "../../models/imageModels";
import { createPresignedUrlToUpload } from "../../utils/preSignedUrl";
import { createUpdateMode } from "../../models/modeModels";

export const getGameModeController = async (req: Request, res: Response) => {
    try {
        const gameMode: GameMode | null = await getAllImages(parseInt(req.query.id as string, 10));
        if (!gameMode) {
            res.status(400).json({ error: 'This game mode doesn\'t exist' });
        } else {
            res.status(200).json({
                gameMode,
                message: "Recovered game mode"
            })
        }
    } catch (error) {
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

export const createGameModeController = async (req: Request, res: Response) => {
    try {
        let newGameMode: GameMode = req.body;
        newGameMode.authorId = req.user.id as number;
        const { id, name, description, authorId, lang } = newGameMode
        newGameMode = { id, name, description, authorId, lang }
        const gamemode = await createGameMode(newGameMode)
        
        res.status(201).json({ 
            id: gamemode,
            message: "Game mode created" 
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, game mode cannot be created",
                    field: error.meta?.target
                })
            }
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            console.log(error);
            
            res.status(500).json({ error: 'Internal server error' });
        }
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, game mode cannot be updated",
                    field: error.meta?.target
                })
            }
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const deleteGameModeController = async (req: Request, res: Response) => {
    try {
        await deleteGameMode(parseInt(req.query.id as string, 10));
        res.status(200).json({ message: "Game mode deleted" })
    } catch (error) {
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

export const createAllGameModeController = async (req: Request, res: Response) => {
    try {
        let newGameMode: GameMode = req.body;
        const images: [] = newGameMode.imageList;

        //création du mode de jeu
        newGameMode.authorId = req.user.id as number;
        const { id, name, description, authorId, lang } = newGameMode
        newGameMode = { id, name, description, authorId, lang }
        const gamemode = await createGameMode(newGameMode)

        //création des images
        const imagesUUID = await createImage(images, req.user.id as number);
        const imagesURL = await createPresignedUrlToUpload(process.env.REGION as string, process.env.BUCKET_NAME as string, imagesUUID);
        const imagesId = await getAllImagesByUUID(imagesUUID);
        console.log(imagesId);
        

        await createUpdateMode({gameModeId: gamemode, imageId: imagesId});

        //liasion entre image et gamemode

        
        res.status(201).json({
            id: gamemode,
            imagesURL,
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            console.log(error);
            
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}