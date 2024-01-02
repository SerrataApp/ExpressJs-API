const express = require('express');
import { createUserController, getUserController } from '../controllers/usersController';

const router = express.Router();

router.get('/', getUserController);
router.post('/', createUserController);

export default router;