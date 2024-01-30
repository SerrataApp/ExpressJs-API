//@ts-nocheck
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { UserPrivateData, UserUpdate, deleteUser, getUserPrivateData, updatePlayedGame, updatePlayerData } from "../../models/userModel";
import { userNotFound } from "../../error/userNotFound";
import { addGitHubIssue } from "../../utils/githubIssues";

export const getUserMeController = async (req: Request, res: Response) => {
    try {
        const user: UserPrivateData | null = await getUserPrivateData(req.user.username);

        if (!user) {
            return userNotFound(res);
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

export const deleteUserMeController = async (req: Request, res: Response) => {
    try {
        const user: Boolean = await deleteUser(req.user.username);

        if (!user) {
            return userNotFound(res);
        }

        res.status(200).json({
            message: "Deleted user"
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

export const updatePlayedGameController = async (req: Request, res: Response) => {
    try {
        await updatePlayedGame(req.user.username);

        res.status(200).json({
            message: "Game updated"
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

export const updatePlayerDataController = async (req: Request, res: Response) => {
    try {
        if (!req.body || (!req.body.username && !req.body.email)) {
            return res.status(400).json({
                error: 'Wrong request format',
                format: {
                    username: "string",
                    email: "string"
                }
            });
        }

        const user: UserUpdate = {
            email: req.body.email || req.user.email,
            username: req.body.username || req.user.username
        };

        if (await updatePlayerData(req.user.id, user) === false)
            return res.status(200).json({ message: "Incorrect e-mail address format" });

        res.status(200).json({
            message: "User updated"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, user cannot be updated",
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