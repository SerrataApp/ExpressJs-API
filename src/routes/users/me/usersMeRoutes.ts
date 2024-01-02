import express from 'express';
import { test } from '../../../controllers/usersController';

const router = express.Router();

router.get('/', test)

export default router;