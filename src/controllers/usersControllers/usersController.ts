import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserPublicData, getUserCreate, UserPublicData, UserCreate, getUserAllData } from '../../models/userModel';
import { Prisma } from "@prisma/client";
import { userNotFound } from "../../error/userNotFound";

dotenv.config();

export const createUserController = async (req: Request, res: Response) => {
    try {
        if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({
                error: 'Wrong request format',
                format: {
                    username: "string",
                    email: "string",
                    password: "string"
                }
            });
        }
        let newUser: UserCreate = req.body;

        const { id, username, email, password } = newUser;
        newUser = { id, username, email, password };

        const createdUser = await createUser(newUser);
        if (createdUser == false) {
            res.status(400).json({
                error: "Incorrect e-mail address format"
            }); 
        } else {
            res.status(201).json({
                createdUser,
                message: "User created"
            });
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, a new user cannot be created",
                    field: error.meta?.target
                })
            }
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getUserController = async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string;

        if (!username) {
            return res.status(400).json({ error: 'Please specify a username' });
        }
        const user: UserPublicData | null = await getUserPublicData(username);

        if (!user) {
            return userNotFound(res)
        }

        res.status(200).json({
            user,
            message: "Recovered user"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    if (!req.body || (!req.body.username && !req.body.email)) {
        return res.status(400).json({
            error: 'Wrong request format',
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
        return userNotFound(res);
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
            error: "Wrong password"
        });
    }
}