import express from 'express';
import { createGameController, getGameController } from '../../controllers/gamesController';

const router = express.Router();

router.get('/', getGameController);
router.post('/', createGameController);

export default router;