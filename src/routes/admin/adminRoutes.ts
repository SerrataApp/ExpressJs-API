import express from "express";
import { deleteAnyGameController, deleteAnyUserController, disableUserController } from "../../controllers/adminControllers/adminController";

const router = express.Router();

router.put('/disable', disableUserController);
router.delete('/game', deleteAnyGameController);
router.delete('/user', deleteAnyUserController);

export default router;