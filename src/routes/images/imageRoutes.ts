import express from "express";
import { createImageController, deleteImageController, getImageController, getPresignedUrlToUpload, updateImageController } from "../../controllers/imagesControllers/imagesController";
import { ensureAuthenticated } from "../../middleware/loginMiddleware";
import { isImageOwner } from "../../middleware/imageMiddleware";

const router = express.Router();

router.get('/', getImageController);
router.post('/', ensureAuthenticated, createImageController);
router.put('/', ensureAuthenticated, isImageOwner, updateImageController);
router.delete('/', ensureAuthenticated, isImageOwner, deleteImageController);
router.get('/uploadurl', getPresignedUrlToUpload);


export default router;