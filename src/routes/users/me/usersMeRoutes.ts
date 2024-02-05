import express from 'express';
import { deleteUserMeController, getUserMeController, updateCGUController, updatePlayedGameController, updatePlayerDataController } from '../../../controllers/usersControllers/usersMeController';

const router = express.Router();

router.get('/', getUserMeController);
router.delete('/', deleteUserMeController);
router.put('/', updatePlayerDataController);
router.put('/game', updatePlayedGameController);
router.put('/cgu', updateCGUController);

export default router;