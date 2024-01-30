//@ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//-------------Schemas de données-------------

export interface Game {
    playerId: number;
    gameMode: number;
    time: number;
    errors: number;
    hint: number;
}

export interface GameInDb extends Game {
    id: number;
    gameDate: Date;
    public: Boolean;
}

//-------------Fonctions de traitement-------------

export async function getGame(id: number): Promise<GameInDb | null> {
    try {
        const game: GameInDb | null = await prisma.game.findUnique({
            where: { id: id }
        });
        return game;
    } catch (error) {
        throw error;
    }
}

export async function getAllUserGames(username: string): Promise<[]> {
    try {
        const games = await prisma.user.findMany({
            where: { username: username },
            select: { Games: true }
        });
        return games[0].Games;
    } catch (error) {
        throw error;
    }
}

export async function getGames(offSet: number, limit: number): Promise<[Game] | []> {
    try {
        const games: [Game] | [] = await prisma.game.findMany({
            skip: offSet,
            take: limit,
        });
        return games;
    } catch (error) {
        throw error;
    }
}

export async function getGamesByGameMode(gameMode: number) {
    try {
        const games = await prisma.gameMode.findMany({
            where: { 
                id: gameMode,
            },
            include: {
                Game: {
                    where: {
                        public: true
                    }
                }
            }
        });
        if (games.length === 0) {
            return [];
        }        
        return games[0].Game;
    } catch (error) {
        throw error;
    }
}

export async function createGame(newGame: Game): Promise<Game | null> {
    try {
        const bestGame = await prisma.game.findFirst({
            where: {
                gameMode: newGame.gameMode,
                playerId: newGame.playerId,
                time: {
                    lt: newGame.time
                }
            }
        })
        if (!bestGame) {
            newGame.public = true;
            await prisma.game.updateMany({
                data: { public: false },          
            })
        } else {
            newGame.public = false;
        }
        const game: Game | null = await prisma.game.create({
            data: newGame
        });
        return game;
    } catch (error) {
        throw error;
    }
}

export async function deleteGameMe(id: number, playerId: number): Promise<GameInDb | null> {
    try {
        const game: GameInDb | null = await prisma.game.delete({
            where: {
                id: id,
                playerId: playerId
            }
        });
        return game;
    } catch (error) {
        throw error;
    }
}

export async function deleteGame(id: number): Promise<Boolean> {
    try {
        await prisma.game.delete({
            where: {
                id: id,
            }
        });
        return true;
    } catch (error) {
        throw error;
    }
}

export async function updateGameState(id: number): Promise<Boolean> {
    try {
        const gameModeId = await prisma.game.findUnique({
            where: { id: id },
            select: { gameMode: true }
        });
        if (!gameModeId) return false;
        await prisma.game.updateMany({
            data: { public: false },
            where: { gameMode: gameModeId}
        });
        await prisma.game.update({
            where: { id: id },
            data: { public: true }
        });
        return true
    } catch (error) {
        throw error;
    }
}