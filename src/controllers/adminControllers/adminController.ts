import { Request, Response } from "express";
import { disableUser } from "../../models/userModel";

export const disableUserController = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.query.id as string, 10);
        await disableUser(userId);
        res.status(200).json({
            message: "User disable"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User deactivation error' });
    }
}