import express from "express";
import upload from '../utils/multerConfig.js';
import {
  getTestimonials,
  getTestimonial,
  getFeaturedTestimonials,
  getStats,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleVerification,
} from "../controllers/testimonialController.js";
import { testimonialValidation } from "../middlewares/validation.js";
import { handleValidationErrors } from "../middlewares/errorHandler.js";

const router = express.Router();

// Public routes
router.get("/", getTestimonials);

router.get("/featured", getFeaturedTestimonials);

router.get("/stats", getStats);

router.get("/:id", getTestimonial);

// Admin routes (add authentication middleware as needed)
router.post(
  "/",
  upload.single("image"),
  testimonialValidation,
  handleValidationErrors,
  createTestimonial
);

router.put(
  "/:id",
  upload.single("image"),
  handleValidationErrors,
  updateTestimonial
);

router.delete(
  "/:id",
  handleValidationErrors,
  deleteTestimonial
);

router.patch(
  "/:id/verify",
  handleValidationErrors,
  toggleVerification
);

export default router;

// GET    /api/testimonials           - Get all testimonials (with filters)
// GET    /api/testimonials/featured  - Get featured testimonials  
// GET    /api/testimonials/stats     - Get statistics
// GET    /api/testimonials/:id       - Get single testimonial
// POST   /api/testimonials           - Create testimonial (with image)
// PUT    /api/testimonials/:id       - Update testimonial (with image)
// DELETE /api/testimonials/:id       - Soft delete testimonial
// PATCH  /api/testimonials/:id/verify - Toggle verification