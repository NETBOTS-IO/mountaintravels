import express from "express";
import * as partnerFeedbackController from "../controllers/partnerFeedbackController.js";
import upload from "../utils/multerConfig.js";

const router = express.Router();
// public routes
router.get("/", partnerFeedbackController.getAllFeedbacks);
// protected routes
router.post(
  "/",
  upload.single("logo"),
  partnerFeedbackController.createFeedback
);
router.get("/:id", partnerFeedbackController.getFeedbackById);
router.put(
  "/:id",
  upload.single("logo"),
  partnerFeedbackController.updateFeedback
);
router.delete("/:id", partnerFeedbackController.deleteFeedback);

export default router;
