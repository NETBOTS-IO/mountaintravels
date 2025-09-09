import express from 'express';
import { getAllPhotos, getPhotoById, createPhoto, updatePhoto, deletePhoto } from '../controllers/galleryController.js';
import { galleryValidation } from '../middlewares/validation.js';
import { handleValidationErrors } from '../middlewares/errorHandler.js';
// import auth from '../middlewares/auth.js';
import upload, { convertToAvif } from "../utils/multerConfig.js";

const router = express.Router();

// Public routes
router.get('/', getAllPhotos);
router.get('/:id', getPhotoById);

// Protected routes (add auth middleware as needed)
router.post(
  "/",
  upload.fields([{ name: "src", maxCount: 10 }]),
  convertToAvif,              // ✅ convert uploaded images to AVIF
  galleryValidation,
  handleValidationErrors,
  createPhoto
);
router.put(
  "/:id",
  upload.fields([{ name: "src", maxCount: 10 }]),
  convertToAvif,              // ✅ run AVIF conversion if new images uploaded
  galleryValidation,
  handleValidationErrors,
  updatePhoto
);
router.delete('/:id', /* auth, */ deletePhoto);

export default router; 