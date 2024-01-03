import express from 'express';
import { deleteUserMeController, getUserMeController, updatePlayedGameController } from '../../../controllers/usersControllers/usersMeController';

const router = express.Router();

router.get('/', getUserMeController);
router.delete('/', deleteUserMeController);
router.put('/game', updatePlayedGameController);

export default router;