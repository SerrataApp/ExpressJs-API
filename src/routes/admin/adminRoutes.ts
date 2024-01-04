import express from "express";
import { disableUserController } from "../../controllers/adminControllers/adminController";

const router = express.Router();

router.put('/disable', disableUserController);

export default router;