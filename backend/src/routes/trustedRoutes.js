import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/trustedController.js";
import upload, { convertToAvif } from "../utils/multerConfig.js";

const router = express.Router();

router.post(
  "/created",
  upload.single("image"),   // ✅ handle single image upload
  convertToAvif,            // ✅ convert to avif
  createCompany
);

router.get("/", getCompanies);
router.get("/getby/:id", getCompanyById);

router.put(
  "/updateby/:id",
  upload.single("image"),   // optional update with new image
  convertToAvif,
  updateCompany
);

router.delete("/deleteby/:id", deleteCompany);

export default router;
