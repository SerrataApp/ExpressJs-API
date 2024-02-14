import express from "express";
import { ensureAuthenticated } from "../../middleware/loginMiddleware";
import { createAllGameModeController, createGameModeController, deleteGameModeController, getAllImagesController, getGameModeController, updateGameModeController } from "../../controllers/gameModeControllers/gameModeControllers";
import { isGameModeOwner } from "../../middleware/gamemodeMiddleware";

const router = express.Router();

router.get('/', getGameModeController);
router.post('/', ensureAuthenticated, createGameModeController);
router.put('/', ensureAuthenticated, isGameModeOwner, updateGameModeController);
router.delete('/', ensureAuthenticated, isGameModeOwner, deleteGameModeController);
router.post('/all', ensureAuthenticated, createAllGameModeController);

router.get('/images', getAllImagesController);

export default router;