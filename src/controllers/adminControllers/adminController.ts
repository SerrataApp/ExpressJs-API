import { Request, Response } from "express";
import { deleteUser, disableUser } from "../../models/userModel";
import { deleteGame, deleteGameMe } from "../../models/gameModel";

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

export const deleteAnyGameController = async (req: Request, res: Response) => {
    try {
        await deleteGame(parseInt(req.query.id as string, 10));
        res.status(200).json({
            message: "Game deleted"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting game' });
    }
}

export const deleteAnyUserController = async (req: Request, res: Response) => {
    try {
        await deleteUser(req.query.username as string);
        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
}