//@ts-nocheck

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Image {
    id: number;
    name: [string];
    img: string;
    authorId: number;
}

export async function getImage(id: number): Promise<Image | null> {
    try {
        const image: Image | null = await prisma.image.findUnique({
            where: { id: id }
        })
        return image;
    } catch (error) {
        throw error;
    }
}

export async function createImage(image: Image): Promise<Boolean> {
    try {
        await prisma.image.create({
            data: {
                name: image.name,
                img: image.img,
                authorId: image.authorId
            }
        })
        return true;
    } catch (error) {
        throw error;
    }
}

export async function updateImage(id: number, data: Image): Promise<Boolean> {
    try {
        await prisma.image.update({
            where: { id: id },
            data: {
                name: data.name,
                img: data.img
            }
        })
        return true;
    } catch (error) {
        throw error;
    }
}

export async function deleteImage(id: number): Promise<Boolean> {
    try {
        await prisma.image.delete({
            where: { id: id }
        })
        return true;
    } catch (error) {
        throw error;
    }
}