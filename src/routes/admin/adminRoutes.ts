import express from "express";
import { deleteAnyGameController, deleteAnyUserController, disableUserController, getUserPrivateDataController, turnOffCGUController } from "../../controllers/adminControllers/adminController";

const router = express.Router();

router.put('/disable', disableUserController);
router.delete('/game', deleteAnyGameController);
router.delete('/user', deleteAnyUserController);
router.post('/cgu', turnOffCGUController);
router.get('/user', getUserPrivateDataController);

export default router;