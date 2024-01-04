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

// export async function deleteGame(id: number): Promise<GameInDb | null> {
//     const game: GameInDb | null = await prisma.game.delete({
//         where: { id: id }
//     });
//     return game;
// }
