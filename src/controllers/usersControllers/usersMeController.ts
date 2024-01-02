import { Request, Response } from "express";
import { UserPrivateData, getUserPrivateData } from "../../models/userModel";

export const getUserMeControler = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
}