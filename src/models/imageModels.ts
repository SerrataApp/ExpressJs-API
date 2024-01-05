import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Image {
    id: number;
    name: [string];
    img: string;
}

export async function getImage(name: string): Promise<Image> {
    const image: Image = await prisma.image.findUnique({
        where: { name: name }
    })
    return image;
}

export async function updateImage(name: )

export async function deleteImage(name: string): Promise<Boolean> {
    await prisma.image.delete({
        where: { name: name }
    })
    return true;
}