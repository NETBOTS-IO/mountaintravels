import express from "express";
import {
  createTravelTip,
  getTravelTips,
  getTravelTipById,
  updateTravelTip,
  deleteTravelTip,
} from "../controllers/tipsController.js";
const router = express.Router();
router.post("/create", createTravelTip);
router.get("/", getTravelTips);
router.get("/getby/:id", getTravelTipById);
router.put("/update/:id", updateTravelTip);
router.delete("/delete/:id", deleteTravelTip);

export default router;
