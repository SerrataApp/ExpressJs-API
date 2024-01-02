import express from 'express';
import { createUserController, getUserController } from '../../controllers/usersController';
import usersMeRoutes from './me/usersMeRoutes';

const router = express.Router();

//Récuération d'un user
router.get('/', getUserController);
//Création d'un user
router.post('/', createUserController);

router.use('/me', usersMeRoutes);

export default router;