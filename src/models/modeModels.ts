import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Mode {
    id: number;
    imageId: [number];
    gameModeId: number
}

export async function createUpdateMode(mode: Mode) {
    try {
        const imageData = mode.imageId.map(imageId => ({
            imageId,
            gameModeId: mode.gameModeId,
        }));
    
        await prisma.imageInGameMode.createMany({
            data: imageData,
            skipDuplicates: true
        });
        return;
    } catch (error) {
        console.error("Error in the updatePlayerData: ", error);
        throw error;
    }
}

export async function deleteMode(mode: Mode) {
    try {
        await prisma.imageInGameMode.deleteMany({
            where: {
                imageId: {
                    in: mode.imageId,
                },
                gameModeId: mode.gameModeId
            }
        });
        return;
    } catch (error) {
        console.error("Error in the updatePlayerData: ", error);
        throw error;
    }
}