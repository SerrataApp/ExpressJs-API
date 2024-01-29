import express from 'express';
import { createUserController, getUserUsernameController, getUserIdController, loginUserController } from '../../controllers/usersControllers/usersController';
import usersMeRoutes from './me/usersMeRoutes';
import { ensureAuthenticated } from '../../middleware/loginMiddleware';


const router = express.Router();
//Récuération d'un user
router.get('/username', getUserUsernameController);
router.get('/id', getUserIdController);
//Création d'un user
router.post('/', createUserController);
//Récupération du Bearer token
router.post('/login', loginUserController);

router.use('/me', ensureAuthenticated, usersMeRoutes);

export default router;