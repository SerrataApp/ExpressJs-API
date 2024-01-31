import { Request, Response } from "express";
import { deleteUser, disableUser, getPlayerUsernameById, getUserPrivateData, turnOffCGU } from "../../models/userModel";
import { deleteGame, updateGameState } from "../../models/gameModel";
import { Prisma } from "@prisma/client";
import { addGitHubIssue } from "../../utils/githubIssues";

export const disableUserController = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.query.id as string, 10);
        await disableUser(userId);
        res.status(200).json({
            message: "User disable"
        })
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

export const deleteAnyGameController = async (req: Request, res: Response) => {
    try {
        await deleteGame(parseInt(req.query.id as string, 10));
        res.status(200).json({
            message: "Game deleted"
        })
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

export const deleteAnyUserController = async (req: Request, res: Response) => {
    try {
        await deleteUser(req.query.username as string);
        res.status(200).json({
            message: "User deleted"
        })
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

export const turnOffCGUController = async (req: Request, res: Response) => {
    try {
        await turnOffCGU();
        res.status(200).json({
            message: "CGU turned off"
        })
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

export const getUserPrivateDataController = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.query.id as string, 10);
        const username: string | null = await getPlayerUsernameById(id);
        if (!username)
            res.status(404).json({
                error: "User not found"
            })
        else {
            const user = await getUserPrivateData(username);
            res.status(200).json({
                user,
                message: "Recovered user"
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