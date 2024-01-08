import express from 'express';
import { deleteUserMeController, getUserMeController, updatePlayedGameController, updatePlayerDataController } from '../../../controllers/usersControllers/usersMeController';

const router = express.Router();

router.get('/', getUserMeController);
router.delete('/', deleteUserMeController);
router.put('/', updatePlayerDataController);
router.put('/game', updatePlayedGameController);

export default router;