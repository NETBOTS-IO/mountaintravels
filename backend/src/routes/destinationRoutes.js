import express from "express";
import upload, { convertToAvif } from "../utils/multerConfig.js";
import {
  getAllDestinations,
  getDestinationBySlug,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

// Public routes
router.get("/", getAllDestinations);
router.get("/id/:id", getDestinationById);
router.get("/:slug", getDestinationBySlug);

// Admin routes (add auth middleware here when needed)
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  convertToAvif,
  createDestination,
);
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  convertToAvif,
  updateDestination,
);
router.delete("/:id", deleteDestination);

export default router;
