import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface GameMode {
    id: number;
    name: string;
    description: string;
    authorId: number;
}

export async function getGameMode(id: number): Promise<GameMode | null> {
    const gameMode: GameMode | null = await prisma.gameMode.findUnique({
        where: { id: id }
    })
    return gameMode;
}

export async function createGameMode(gameMode: GameMode): Promise<Boolean> {
    await prisma.gameMode.create({
        data: {
            name: gameMode.name,
            description: gameMode.description,
            authorId: gameMode.authorId
        }
    })
    return true;
}

export async function updateGameMode(id: number, data: GameMode): Promise<Boolean> {
    await prisma.gameMode.update({
        where: { id: id },
        data: {
            name: data.name,
            description: data.description
        }
    })
    return true;
}

export async function deleteGameMode(id: number): Promise<Boolean> {
    await prisma.gameMode.delete({
        where: { id: id }
    })
    return true;
}