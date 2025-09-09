import express from "express";
import {
  getAllTours,
  searchTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getRelatedTours,
  getTourCategories,
} from "../controllers/tourController.js";
import { tourValidation } from "../middlewares/validation.js";
import upload, { convertToAvif } from "../utils/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllTours);
router.get("/search", searchTours);
router.get("/categories", getTourCategories);
router.get("/:id", getTourById);
router.get("/:id/related", getRelatedTours);

// Protected routes (require authentication)
//router.post('/add', createTour);

router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "itineraryImages", maxCount: 20 },
  ]),
  convertToAvif,   // ✅ convert uploaded images to AVIF
  createTour
);

router.put(
  "/:tourId",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "itineraryImages", maxCount: 20 },
  ]),
  convertToAvif,   // ✅ run AVIF conversion if new images uploaded
  updateTour
);

router.delete("/:id", deleteTour);

// GET /api/tours - Get all tours
// GET /api/tours/search - Search tours
// POST /api/tours - Create new tour
// PUT /api/tours/:id - Update tour
// DELETE /api/tours/:id - Delete tour

export default router;
