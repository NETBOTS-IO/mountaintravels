import express from "express";
import {
  createCustomTour,
  getAllCustomTours,
  getCustomTourById,
  updateCustomTour,
  deleteCustomTour,
} from "../controllers/customizedTourController.js";

const router = express.Router();

router.post("/add", createCustomTour);
router.get("/", getAllCustomTours);
router.get("/:id", getCustomTourById);
router.put("/:id", updateCustomTour);
router.delete("/:id", deleteCustomTour);

export default router;
