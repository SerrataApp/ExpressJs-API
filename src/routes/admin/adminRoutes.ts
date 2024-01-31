import express from "express";
import { deleteAnyGameController, deleteAnyUserController, disableUserController, getUserPrivateDataController, turnOffCGUController } from "../../controllers/adminControllers/adminController";
import { updateGameStateController } from "../../controllers/gamesControllers/gamesController";

const router = express.Router();

router.put('/disable', disableUserController);
router.delete('/game', deleteAnyGameController);
router.delete('/user', deleteAnyUserController);
router.post('/cgu', turnOffCGUController);
router.get('/user', getUserPrivateDataController);
router.post('/game/state', updateGameStateController)

export default router;