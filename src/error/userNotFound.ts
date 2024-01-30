import { Response } from "express";

export const userNotFound = (res: Response) => {
    res.status(404).json({ error: 'User not found' });
}