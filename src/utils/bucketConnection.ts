import AWS from 'aws-sdk';
import express, { Request, Response } from 'express';
import multer from 'multer';
import BucketConnection from '../utils/bucketConnection';

class BucketConnection {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: 'AWS_ACCESS_KEY',
            secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
            region: 'YOUR_REGION'
        });
    }

    async imageUploadToS3(Id: string, profilePic: Blob): Promise<void> {
        const image = Buffer.from(await profilePic.arrayBuffer());
        const params = {
            Bucket: 'your-bucket-name',
            Key: `${Id}.jpg`,
            Body: image,
        };
        try {
            await this.s3.upload(params).promise();
        } catch(error) {
            throw new Error('Error while uploading image to S3');
        }
    }
}

export default BucketConnection;

const bucketConnection = new BucketConnection();

// Configuration de multer pour gérer les fichiers envoyés
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de taille du fichier (5 Mo)
    },
});

// Endpoint pour envoyer un fichier
upload.single('file')
const uploadFileController = async (req: Request, res: Response) => {
    try {
        const { file } = req;
        if (!file) {
            throw new Error('No file uploaded');
        }

        // Appel de la méthode d'upload vers S3
        await bucketConnection.imageUploadToS3('fileId', file.buffer);

        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

