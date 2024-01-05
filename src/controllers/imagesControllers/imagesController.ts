import { Request, Response } from "express";
import { Image, createImage, deleteImage, getImage, updateImage } from "../../models/imageModels";

export const getImageController = async (req: Request, res: Response) => {
    try {
        const image: Image | null = await getImage(parseInt(req.query.id as string, 10));
        if (!image) {
            res.status(400).json({ error: 'This image doesn\'t exist' });
        } else {
            res.status(200).json({
                image,
                message: "Recovered image"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during image retrieval : ${error}` });
    }
}

export const createImageController = async (req: Request, res: Response) => {
    try {
        let newImage: Image = req.body;
        newImage.authorId = req.user.id as number;
        const { id, name, img, authorId } = newImage
        newImage = { id, name, img, authorId }
        await createImage(newImage)
        res.status(201).json({ message: "Image created" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during image creation : ${error}` });
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
        console.error(error);
        res.status(500).json({ error: `Error during image update : ${error}` });
    }
}

export const deleteImageController = async (req: Request, res: Response) => {
    try {
        await deleteImage(parseInt(req.query.id as string, 10));
        res.status(200).json({ message: "Image deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error during image delete : ${error}` });
    }
}