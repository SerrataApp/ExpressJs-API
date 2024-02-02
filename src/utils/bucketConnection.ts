import AWS from 'aws-sdk';
import express, { Request, Response } from 'express';

class BucketConnection {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION
        });
    }

    async imageUploadToS3(Id: string, imageBuf: any): Promise<void> {
        const params = {
            Bucket: process.env.BUCKET_NAME as string,
            Key: `${Id}.png`,
            Body: imageBuf,
        };
        try {
            await this.s3.upload(params).promise();
        } catch(error) {
            throw new Error('Error while uploading image to S3');
        }
    }
}

export default BucketConnection;

