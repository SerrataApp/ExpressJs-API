//@ts-nocheck

import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { Image, createImage, deleteImage, getImage, updateImage } from "../../models/imageModels";
import { addGitHubIssue } from "../../utils/githubIssues";
import BucketConnection from "../../utils/bucketConnection";
import { convertImageToWebpBinary } from "../../utils/imageConverter";

const bucketConnection = new BucketConnection();

export const getImageController = async (req: Request, res: Response) => {
    try {
        const image: Image | null = await getImage(parseInt(req.query.id as string, 10));
        if (!image) {
            res.status(404).json({ error: 'This image doesn\'t exist' });
        } else {
            res.status(200).json({
                image,
                message: "Recovered image"
            })
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const createImageController = async (req: Request, res: Response) => {
    try {
        let newImage: Image = req.body;
        newImage.authorId = req.user.id as number;
        const { name, img, authorId } = newImage
        newImage = { name, img, authorId }
        const ref = await createImage(newImage)
        res.status(201).json({
            ref: ref,
            message: "Image created"
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, a new image cannot be created",
                    field: error.meta?.target
                })
            }
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            console.log(error);
            
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const updateImageController = async (req: Request, res: Response) => {
    try {
        const imageId: number = parseInt(req.query.id as string, 10);
        let imageToUpdate: Image = req.body;
        const { id, name, img, authorId } = imageToUpdate
        imageToUpdate = { id, name, img, authorId }
        await updateImage(imageId, imageToUpdate)
        res.status(200).json({ message: "Image updated" })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, image cannot be updated",
                    field: error.meta?.target
                })
            }
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const deleteImageController = async (req: Request, res: Response) => {
    try {
        await deleteImage(parseInt(req.query.id as string, 10));
        res.status(200).json({ message: "Image deleted" })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const uploadImageController = async (req: Request, res: Response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }
        const fileContent = Buffer.from(req.files.uploadedFile.data, 'base64');
        const file = req.files.uploadedFile.name.split('.');
        if (file[1] !== 'png' && file[1] !== 'jpg' && file[1] !== 'jpeg') {
            return res.status(400).json({ error: 'Only .png or .jpg or .jpeg files are allowed' });
        }

        const webpBase64 = await convertImageToWebpBinary(fileContent);
        
        await bucketConnection.imageUploadToS3(file[0], webpBase64);
        res.status(200).json({ message: "Image uploaded" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getImageFromS3Controller = async (req: Request, res: Response) => {
    try {
        await bucketConnection.imageGetFromS3(req.query.id as string, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}