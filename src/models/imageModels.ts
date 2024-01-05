import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Image {
    id: number;
    name: [string];
    img: string;
    authorId: number;
}

export async function getImage(id: number): Promise<Image | null> {
    const image: Image = await prisma.image.findUnique({
        where: { id: id }
    })
    return image;
}

export async function createImage(image: Image): Promise<Boolean> {
    await prisma.image.create({
        data: {
            name: image.name,
            img: image.img,
            authorId: image.authorId
        }
    })
    return true;
}

export async function updateImage(id: number, data: Image): Promise<Boolean> {
    await prisma.image.update({
        where: { id: id },
        data: {
            name: data.name,
            img: data.img
        }
    })
    return true;
}

export async function deleteImage(id: number): Promise<Boolean> {
    await prisma.image.delete({
        where: { id: id }
    })
    return true;
}