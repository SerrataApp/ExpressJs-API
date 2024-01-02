import express from 'express';
import { createUserController, getUserController, loginUserController } from '../../controllers/usersControllers/usersController';
import usersMeRoutes from './me/usersMeRoutes';
import { ensureAuthenticated } from '../../middleware/loginMiddleware';


const router = express.Router();
//Récuération d'un user
router.get('/', getUserController);
//Création d'un user
router.post('/', createUserController);
//Récupération du Bearer token
router.post('/login', loginUserController);

router.use('/me', ensureAuthenticated, usersMeRoutes);

export default router;