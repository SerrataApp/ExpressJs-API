//@ts-nocheck

import { Request, Response } from "express";
import { UserPrivateData, UserPublicData, UserUpdate, deleteUser, getUserPrivateData, updatePlayedGame, updatePlayerData } from "../../models/userModel";

export const getUserMeController = async (req: Request, res: Response) => {
    try {
        const user: UserPrivateData | null = await getUserPrivateData(req.user.username);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        res.status(200).json({
            user,
            message: "Utilsateur récupéré"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utiliasteur' });
    }
}

export const deleteUserMeController = async (req: Request, res: Response) => {
    try {
        const user: UserPrivateData | null = await deleteUser(req.user.username);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        res.status(200).json({
            message: "Utilsateur supprimé"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
}

export const updatePlayedGameController = async (req: Request, res: Response) => {
    try {
        await updatePlayedGame(req.user.username);

        res.status(200).json({
            message: "Game updated"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout d\'une partie au conteur' });
    }
}

export const updatePlayerDataController = async (req: Request, res: Response) => {
    try {
        console.log(req.user.email, req.user.username);
        const user: UserUpdate = {
            email: req.body.email || req.user.email,
            username: req.body.username || req.user.username
        };

        if (await updatePlayerData(req.user.id, user) === false)
            res.status(200).json({ message: "Email is not correct" });

        res.status(200).json({
            message: "User updated"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during updating user' });
    }
}