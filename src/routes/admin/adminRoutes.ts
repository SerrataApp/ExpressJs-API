import express from "express";
import { deleteAnyGameController, deleteAnyUserController, disableUserController, turnOffCGUController } from "../../controllers/adminControllers/adminController";

const router = express.Router();

router.put('/disable', disableUserController);
router.delete('/game', deleteAnyGameController);
router.delete('/user', deleteAnyUserController);
router.post('/cgu', turnOffCGUController);

export default router;