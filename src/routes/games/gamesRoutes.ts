import express from "express";
import { getGamesByGameModeController, getGamesController, updateGameStateController } from "../../controllers/gamesController";

const router = express.Router();

router.get('/', getGamesController);
router.get('/mode', getGamesByGameModeController);
router.put('/changeState', updateGameStateController);

export default router;