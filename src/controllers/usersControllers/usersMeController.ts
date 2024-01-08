//@ts-nocheck

import { Request, Response } from "express";
import { UserPrivateData, UserPublicData, deleteUser, getUserPrivateData, updatePlayedGame } from "../../models/userModel";

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
        const user: UserPublicData | null = await updatePlayedGame(req.user.username);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        res.status(200).json({
            user,
            message: "Une partie à été ajouté"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout d\'une partie au conteur' });
    }
}