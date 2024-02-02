import AWS from 'aws-sdk';
import { Response } from 'express';
import { request } from 'http';

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
            Key: `${Id}.webp`,
            Body: imageBuf,
        };
        try {
            await this.s3.upload(params).promise();
        } catch(error) {
            throw new Error('Error while uploading image to S3');
        }
    }

    async imageGetFromS3(Id: string, res: Response): Promise<any> {
        const params = {
            Bucket: process.env.BUCKET_NAME as string,
            Key: `${Id}.webp`,
        };
        try {
            this.s3.getObject(params, (err, data) => {
                res.setHeader('Content-disposition', `inline; filename=${Id}.webp`);
                res.end(data.Body, 'binary');
            });

            request(`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${Id}.webp`).pipe(res.set('Content-Type', 'image/webp').set('Content-Disposition', `inline; filename=${Id}.webp`))
        } catch(error) {
            throw new Error('Error while getting image from S3');
        }
    }
}

export default BucketConnection;

