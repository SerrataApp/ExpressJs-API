import express from "express";
import { getGamesByGameModeController, getGamesController, updateGameStateController } from "../../controllers/gamesControllers/gamesController";
import { ensureAuthenticated } from "../../middleware/loginMiddleware";
import { isGameOwner } from "../../middleware/gameMiddleware";

const router = express.Router();

router.get('/', getGamesController);
router.get('/mode', getGamesByGameModeController);
router.put('/changeState', ensureAuthenticated, isGameOwner, updateGameStateController);

export default router;