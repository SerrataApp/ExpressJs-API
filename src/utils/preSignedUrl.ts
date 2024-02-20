import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const createPresignedUrlToUpload = async (region: string, bucket: string, key: [string]) => {
    const S3config = {
        region: region,
        credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    }
    const client = new S3Client(S3config);
    const urlsList: string[] = [];
    try {
        await Promise.all(key.map(async (k) => {
            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: `image/${k}`,
            });
            urlsList.push(await getSignedUrl(client, command, { expiresIn: 120 }));
        }))
        return urlsList;
    } catch (error) {
        throw error;
    }
}