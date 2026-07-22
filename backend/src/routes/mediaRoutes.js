import express from "express";
import {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
  streamVideo,
} from "../controllers/mediaController.js";
import { galleryValidation } from "../middlewares/validation.js";
import { handleValidationErrors } from "../middlewares/errorHandler.js";
import upload, { convertToAvif } from "../utils/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllMedia);
router.get("/stream/:filename", streamVideo);
router.get("/:id", getMediaById);

// Upload routes (accept up to 10 files on field "src")
router.post(
  "/",
  upload.fields([{ name: "src", maxCount: 10 }]),
  convertToAvif, // Optimized handler for both AVIF conversion and Video compression
  galleryValidation,
  handleValidationErrors,
  createMedia,
);

router.put(
  "/:id",
  upload.fields([{ name: "src", maxCount: 10 }]),
  convertToAvif, // Optimized handler for both AVIF conversion and Video compression
  galleryValidation,
  handleValidationErrors,
  updateMedia,
);

router.delete("/:id", deleteMedia);

export default router;
