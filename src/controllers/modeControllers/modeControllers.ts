import { Request, Response } from "express";
import { Mode, createUpdateMode } from "../../models/modeModels";

export const createUpdateModeController = async (req: Request, res: Response) => {
    try {
        let newMode: Mode = req.body;
        const { id, imageId, gameModeId } = newMode;
        newMode = { id, imageId, gameModeId }
        await createUpdateMode(newMode);
        res.status(201).json({
            message: "Mode created"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error during mode create" })
    }
}