import express from "express";
import { createUpdateModeController, deleteModeController } from "../../controllers/modeControllers/modeControllers";

const router = express.Router();

router.post('/', createUpdateModeController);
router.delete('/', deleteModeController);

export default router;