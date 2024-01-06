import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Mode {
    id: number;
    imageId: [number];
    gameModeId: number
}

export async function createUpdateMode(mode: Mode) {
    const imageData = mode.imageId.map(imageId => ({
        imageId,
        gameModeId: mode.gameModeId,
    }));

    await prisma.imageInGameMode.createMany({
        data: imageData,
        skipDuplicates: true
    });
    return;
}

export async function deleteMode(mode: Mode) {
    await prisma.imageInGameMode.deleteMany({
        where: {
            imageId: {
                in: mode.imageId,
            },
            gameModeId: mode.gameModeId
        }
    });
    return;
}