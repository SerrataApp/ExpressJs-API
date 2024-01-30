import { Request, Response } from "express";
import { deleteUser, disableUser } from "../../models/userModel";
import { deleteGame } from "../../models/gameModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addGitHubIssue } from "../../utils/githubIssues";

export const disableUserController = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.query.id as string, 10);
        await disableUser(userId);
        res.status(200).json({
            message: "User disable"
        })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
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
        if (error instanceof PrismaClientKnownRequestError) {
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
        if (error instanceof PrismaClientKnownRequestError) {
            addGitHubIssue(error)
            
            res.status(500).json({
                error: "Prisma error, please notify api creator",
            })
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}