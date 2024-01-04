import express from 'express';
import { createGameController, deleteGameController, getGameController } from '../../controllers/gamesController';
import { ensureAuthenticated } from '../../middleware/loginMiddleware';
import { isGameOwner } from '../../middleware/gameMiddleware';

const router = express.Router();

router.get('/', getGameController);
router.post('/', ensureAuthenticated, createGameController);
router.delete('/', ensureAuthenticated, isGameOwner, deleteGameController);

export default router;