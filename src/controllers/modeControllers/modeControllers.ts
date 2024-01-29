import { Request, Response } from "express";
import { Mode, createUpdateMode, deleteMode } from "../../models/modeModels";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addGitHubIssue } from "../../utils/githubIssues";

export const createUpdateModeController = async (req: Request, res: Response) => {
    checkBodyRequest(req, res);
    try {
        let newMode: Mode = req.body;
        const { id, imageId, gameModeId } = newMode;
        newMode = { id, imageId, gameModeId }

        await createUpdateMode(newMode);

        res.status(201).json({
            message: "Mode created/modified"
        })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    error: "There is a unique constraint violation, a new mode can not be created",
                    field: error.meta?.target
                })
            }
            if (error.code === 'P2003') {
                return res.status(400).json({
                    error: "Foreign key constraint failed, the element you want to insert probably doesn't exist",
                    field: error.meta?.field_name
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

export const deleteModeController = async (req: Request, res: Response) => {
    checkBodyRequest(req, res);
    try {
        let modeToDelete: Mode = req.body;
        const { id, imageId, gameModeId } = modeToDelete;
        modeToDelete = { id, imageId, gameModeId }
        await deleteMode(modeToDelete);
        res.status(201).json({
            message: "Mode deleted"
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

const checkBodyRequest = (req: Request, res: Response) => {
    if (!req.body || !req.body.imageId || !req.body.gameModeId) {
        return res.status(400).json({
            error: 'Wrong request format',
            format: {
                imageId: "[int]",
                gameModeId: "int"
            }
        });
    }
    if (!Array.isArray(req.body.imageId)) {
        return res.status(400).json({
            error: 'imageId must be an array'
        });
    }
}