import express from "express";
import upload, { convertToAvif } from "../utils/multerConfig.js";
import {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../controllers/popularController.js";

const router = express.Router();

router.post("/create", upload.single("image"), convertToAvif, createDestination);
router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.put("/:id", upload.single("image"), convertToAvif, updateDestination);
router.delete("/:id", deleteDestination);

export default router;
