import { Request, Response } from "express";
import { createUser, getUser, UserPublicData, UserCreate } from '../models/userModel';

// TODO changer les numero de status d'erreur

export const createUserController = async (req: Request, res: Response) => {
    try {
        let newUser: UserCreate = req.body as UserCreate;

        const { username, email, password } = newUser;
        newUser = { username, email, password };

        const createdUser = await createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserController = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.query.id as string, 10);

        if (isNaN(user_id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user: UserPublicData | null = await getUser(user_id);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}