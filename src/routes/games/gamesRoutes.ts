import express from 'express';
import { createGameController, getGameController } from '../../controllers/gamesController';
import { ensureAuthenticated } from '../../middleware/loginMiddleware';

const router = express.Router();

router.get('/', getGameController);
router.post('/', ensureAuthenticated, createGameController);

export default router;