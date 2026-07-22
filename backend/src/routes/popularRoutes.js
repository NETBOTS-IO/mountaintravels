import express from "express";
import upload, { convertToWebp } from "../utils/multerConfig.js";
import {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../controllers/popularController.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  convertToWebp,
  createDestination,
);
router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.put("/:id", upload.single("image"), convertToWebp, updateDestination);
router.delete("/:id", deleteDestination);

export default router;
