//@ts-nocheck

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

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

export async function getAllImagesByUUID(uuidList: [string]): Promise<[number]> {
    try {
        const images: [number] = await prisma.image.findMany({
            where: {
                ref: {
                    in: uuidList
                }
            },
            select: {
                id: true
            }
        })
        return images.map((img) => img.id);
    } catch (error) {
        throw error;
    }
}

export async function getAllImagesUUIDById(ids: [number]) {
    try {
        const images: [number] = await prisma.image.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                ref: true
            }
        })
        return images.map((img) => img.ref);
    } catch (error) {
        throw error;
    }
}

export async function createImage(image: Image[], authorId: number): Promise<string[]> {
    try {
        const uuidList: string[] = [];
        await Promise.all(image.map(async (img) => {
            const ref = randomUUID();
            await prisma.image.create({
                data: {
                    name: img.name,
                    img: img.img,
                    authorId: authorId,
                    ref: ref
                }
            })
            uuidList.push(ref); 
        }));
        return uuidList;
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

