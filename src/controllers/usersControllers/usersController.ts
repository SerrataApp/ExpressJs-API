import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserPublicData, getUserCreate, UserPublicData, UserCreate, getUserAllData } from '../../models/userModel';

// TODO changer les numero de status d'erreur

dotenv.config();

export const createUserController = async (req: Request, res: Response) => {
    try {
        let newUser: UserCreate = req.body;

        const { id, username, email, password } = newUser;
        newUser = { id, username, email, password };

        const createdUser = await createUser(newUser);
        //@ts-ignore
        if (createdUser == false) {
            res.status(400).json({
                message: "L'email n'a pas un format correct"
            }); 
        } else {
            res.status(201).json({
                createdUser,
                message: "Utilisateur créé"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
}

export const getUserController = async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string;

        if (!username) {
            return res.status(400).json({ error: 'Veuillez préciser un nom d\'utilisateur' });
        }
        const user: UserPublicData | null = await getUserPublicData(username);

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

export const loginUserController = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(404).json({
            error: 'Utilisateur introuvable',
            format: {
                username: "string",
                password: "string"
            }
        });
    }

    let userToLogin: UserCreate = req.body;
    const { id, username, email, password } = userToLogin;
    userToLogin = { id, username, email, password };

    const user: UserCreate | null = await getUserCreate(userToLogin.username);

    if (!user) {
        return res.status(404).json({
            error: 'Utilisateur introuvable'
        });
    }
    if (bcrypt.compareSync(userToLogin.password, user.password)) {
        const token = jwt.sign(
            { user },
            process.env.SECRET_KEY as string,
            { expiresIn: "24h" }
        );
        res.json({
            token,
            token_type: "Bearer"
        })
    } else {
        res.status(401).json({
            message: "Mauvais mot de passe"
        });
    }
}

export const test = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.query.id as string, 10);
    const user = await getUserAllData(userId);
    res.status(200).json({
        user
    })
}