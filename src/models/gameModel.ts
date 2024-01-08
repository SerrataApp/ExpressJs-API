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
    public: Boolean;
}

export interface GameInDb extends Game {
    id: number;
    gameDate: Date;
}

//-------------Fonctions de traitement-------------

export async function getGame(id: number): Promise<GameInDb | null> {
    const game: GameInDb | null = await prisma.game.findUnique({
        where: { id: id }
    });
    return game;
}

export async function getAllUserGames(username: string) {
    const games = await prisma.user.findMany({
        where: { username: username },
        select: { Games: true }
    });
    return games[0].Games;
}

export async function getGames(offSet: number, limit: number): Promise<[Game] | []> {
    const games: [Game] | [] = await prisma.game.findMany({
        skip: offSet,
        take: limit,
    });
    return games;
}

export async function getGamesByGameMode(gameMode: number) {
    const games = await prisma.gameMode.findMany({
        where: { id: gameMode },
        select: { Game: true }
    })
    return games[0].Game;
}

export async function createGame(newGame: Game): Promise<Game | null> {
    const game: Game | null = await prisma.game.create({
        data: newGame
    });
    return game;
}

export async function deleteGameMe(id: number, playerId: number): Promise<GameInDb | null> {
    const game: GameInDb | null = await prisma.game.delete({
        where: {
            id: id,
            playerId: playerId
        }
    });
    return game;
}

export async function deleteGame(id: number): Promise<Boolean> {
    await prisma.game.delete({
        where: {
            id: id,
        }
    });
    return true;
}

export async function updateGameState(id: number): Promise<Boolean> {
    await prisma.game.updateMany({
        data: { public: false }
    });
    await prisma.game.update({
        where: { id: id },
        data: { public: true }
    })
    return true
}

// export async function deleteGame(id: number): Promise<GameInDb | null> {
//     const game: GameInDb | null = await prisma.game.delete({
//         where: { id: id }
//     });
//     return game;
// }
