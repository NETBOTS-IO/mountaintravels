import express from "express";
import {
  createCustomItinerary,
  getCustomItineraries,
} from "../controllers/customItineraryController.js";

const router = express.Router();

router.post("/add", createCustomItinerary);
router.get("/", getCustomItineraries);

export default router;
