import express from "express";
import { createUpdateModeController } from "../../controllers/modeControllers/modeControllers";

const router = express.Router();

router.post('/', createUpdateModeController);

export default router;