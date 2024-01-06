import express from "express";
import { createModeController } from "../../controllers/modeControllers/modeControllers";

const router = express.Router();

router.post('/', createModeController);

export default router;