import express from "express";
import { ensureAuthenticated } from "../../middleware/loginMiddleware";
import { createGameModeController, deleteGameModeController, getGameModeController, updateGameModeController } from "../../controllers/gameModeControllers/gameModeControllers";
import { isGameModeOwner } from "../../middleware/gamemodeMiddleware";

const router = express.Router();

router.get('/', getGameModeController);
router.post('/', ensureAuthenticated, createGameModeController);
router.put('/', ensureAuthenticated, isGameModeOwner, updateGameModeController);
router.delete('/', ensureAuthenticated, isGameModeOwner, deleteGameModeController);

export default router;