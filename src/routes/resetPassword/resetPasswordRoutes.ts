import express from "express";
import { getPassResetLink } from "../../controllers/resetPasswordController/passReset";

const router = express.Router();

router.post('/', getPassResetLink);

export default router;