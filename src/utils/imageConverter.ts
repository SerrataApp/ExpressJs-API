import sharp from 'sharp';

export const convertImageToWebpBinary = async (imageBuffer: string): Promise<Buffer> => {
    try {
        return await sharp(imageBuffer).toFormat('webp').toBuffer();
    } catch (error) {
        console.error('Error converting image to webp', error);
        throw error;
    }
}