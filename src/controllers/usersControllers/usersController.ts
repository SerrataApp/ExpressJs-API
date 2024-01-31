import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserPublicDataByUsername, getUserCreate, UserPublicData, UserCreate, getUserPublicDataById } from '../../models/userModel';
import { userNotFound } from "../../error/userNotFound";
import { addGitHubIssue } from "../../utils/githubIssues";
import { Prisma } from "@prisma/client";

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

        const { id, username, email, password, cgu } = newUser;
        newUser = { id, username, email, password, cgu };

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
                return res.status(409).json({
                    error: "There field already exists",
                    field: error.meta?.target
                })
            }
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getUserUsernameController = async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string;

        if (!username) {
            return res.status(400).json({ error: 'Please specify a username' });
        }
        const user: UserPublicData | null = await getUserPublicDataByUsername(username);

        if (!user) {
            return userNotFound(res)
        }

        res.status(200).json({
            user,
            message: "Recovered user"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getUserIdController = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.query.id as string, 10);

        if (!userId) {
            return res.status(400).json({ error: 'Please specify a username' });
        }
        const user: UserPublicData | null = await getUserPublicDataById(userId);

        if (!user) {
            return userNotFound(res)
        }

        res.status(200).json({
            user,
            message: "Recovered user"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    if (!req.body || !req.body.username || !req.body.password) {
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

    try {
        const user: UserCreate | null = await getUserCreate(userToLogin.username);
    
        if (!user) {
            return userNotFound(res);
        }
    
        if (bcrypt.compareSync(userToLogin.password + process.env.SEL, user.password)) {
            const token = jwt.sign(
                { user },
                process.env.SECRET_KEY as string,
                { expiresIn: "24h", algorithm: "HS256"}
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
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}