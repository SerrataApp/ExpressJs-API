import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//-------------Schemas de données-------------

export interface Game extends GameInDb {
    playerId: number;
    gameMode: number;
    time: number;
    errors: number;
    hint: number;
    public: Boolean;
}

export interface GameInDb {
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

export async function createGame(newGame: Game): Promise<Game | null> {
    const game: Game | null = await prisma.game.create({
        data: newGame
    })
    return game;
}
