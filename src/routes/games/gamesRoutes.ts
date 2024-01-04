import express from "express";
import { getGamesController } from "../../controllers/gamesController";

const router = express.Router();

router.get('/', getGamesController);

export default router;