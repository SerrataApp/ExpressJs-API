import express from 'express';
import { getUserMeControler } from '../../../controllers/usersControllers/usersMeController';

const router = express.Router();

router.get('/', getUserMeControler);

export default router;