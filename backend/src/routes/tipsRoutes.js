import express from "express";
import upload, { convertToAvif } from "../utils/multerConfig.js";
import {
  createTravelTip,
  getTravelTips,
  getTravelTipById,
  getTravelTipBySlug,
  updateTravelTip,
  deleteTravelTip,
} from "../controllers/tipsController.js";

const router = express.Router();

// CRUD routes
router.post(
  "/create",
  upload.single("image"),
  convertToAvif,
  createTravelTip
);

router.get("/", getTravelTips); // Get all
router.get("/getby/:id", getTravelTipById); // Get by ID
router.get("/slug/:slug", getTravelTipBySlug); // Get by slug

router.put(
  "/update/:id",
  upload.single("image"),
  convertToAvif,
  updateTravelTip
);

router.delete("/delete/:id", deleteTravelTip);

export default router;
