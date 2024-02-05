import express from "express";
import fileUpload from 'express-fileupload';
import { uploadImageController } from "../../../controllers/imagesControllers/imagesController";

const router = express.Router();

router.use(fileUpload());

router.post('/', uploadImageController)

export default router;