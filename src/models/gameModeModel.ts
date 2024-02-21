//@ts-nocheck

import { PrismaClient } from '@prisma/client';
import { getAllImagesUUIDById } from './imageModels';

const prisma = new PrismaClient();

export interface GameMode {
    id: number;
    name: string;
    description: string;
    authorId: number;
    lang: string;
    imageList: [string];
}

export async function getGameMode(id: number): Promise<GameMode | null> {
    try {
        const gameMode: GameMode | null = await prisma.gameMode.findUnique({
            where: { 
                id: id,
            },
            include: {
                imageList: {
                    select: {
                        imageId: true
                    }
                }
            }
        })
        gameMode?.imageList = await getAllImagesUUIDById(gameMode?.imageList?.map((i) => i.imageId)) || [];
        return gameMode;
    } catch (error) {
        throw error;
    }
}

export async function getAllImages(id: number) {
    try {
        const images = await prisma.gameMode.findUnique({
            where: { id: id },
            include: {
                imageList: {
                    select: {
                        image: {
                            select: {
                                name: true,
                                img: true,
                                ref: true
                            },
                        }
                    }
                }
            }
        })
        // ?.imageList.map((item: any) => item.image);
        return images
    } catch (error) {
        throw error;
    }
}

export async function createGameMode(gameMode: GameMode): Promise<number> {
    try {
        const gamemode = await prisma.gameMode.create({
            data: {
                name: gameMode.name,
                description: gameMode.description,
                authorId: gameMode.authorId,
                lang: gameMode.lang
            }
        })
        return gamemode.id;
    } catch (error) {
        throw error;
    }
}

export async function updateGameMode(id: number, data: GameMode): Promise<Boolean> {
    try {
        await prisma.gameMode.update({
            where: { id: id },
            data: {
                name: data.name,
                description: data.description
            }
        })
        return true;
    } catch (error) {
        throw error;
    }
}

export async function deleteGameMode(id: number): Promise<Boolean> {
    try {
        await prisma.gameMode.delete({
            where: { id: id }
        })
        return true;
    } catch (error) {
        throw error;
    }
}