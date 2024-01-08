import express from "express";
import { ensureAuthenticated } from "../../middleware/loginMiddleware";
import { createGameModeController, deleteGameModeController, getAllImagesController, getGameModeController, updateGameModeController } from "../../controllers/gameModeControllers/gameModeControllers";
import { isGameModeOwner } from "../../middleware/gamemodeMiddleware";

const router = express.Router();

router.get('/', getGameModeController);
router.post('/', ensureAuthenticated, createGameModeController);
router.put('/', ensureAuthenticated, isGameModeOwner, updateGameModeController);
router.delete('/', ensureAuthenticated, isGameModeOwner, deleteGameModeController);

router.get('/images', getAllImagesController);

export default router;