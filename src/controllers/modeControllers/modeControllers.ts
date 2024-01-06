import { Request, Response } from "express";
import { Mode, createUpdateMode, deleteMode } from "../../models/modeModels";

export const createUpdateModeController = async (req: Request, res: Response) => {
    try {
        let newMode: Mode = req.body;
        const { id, imageId, gameModeId } = newMode;
        newMode = { id, imageId, gameModeId }
        await createUpdateMode(newMode);
        res.status(201).json({
            message: "Mode created/modified"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error during mode create" })
    }
}

export const deleteModeController = async (req: Request, res: Response) => {
    try {
        let modeToDelete: Mode = req.body;
        const { id, imageId, gameModeId } = modeToDelete;
        modeToDelete = { id, imageId, gameModeId }
        await deleteMode(modeToDelete);
        res.status(201).json({
            message: "Mode deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error during mode delete" })
    }
}