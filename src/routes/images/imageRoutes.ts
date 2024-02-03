import express from "express";
import { createImageController, deleteImageController, getImageController, getImageFromS3Controller, updateImageController } from "../../controllers/imagesControllers/imagesController";
import { ensureAuthenticated } from "../../middleware/loginMiddleware";
import { isImageOwner } from "../../middleware/imageMiddleware";
import imageUploadRoutes from "./imageUpload/imageUploadRoutes";

const router = express.Router();

router.get('/', getImageController);
router.post('/', ensureAuthenticated, createImageController);
router.put('/', ensureAuthenticated, isImageOwner, updateImageController);
router.delete('/', ensureAuthenticated, isImageOwner, deleteImageController);
router.get('/imageUpload', getImageFromS3Controller);
router.use('/upload', imageUploadRoutes);


export default router;