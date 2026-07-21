/**
 * Seed Tour Images Script
 * - Copies tour WebP images from website/public/images/tours/ to backend/src/uploads/tours/
 * - Updates all tour records in MongoDB to use backend image URLs
 * Run: node src/scripts/seedToursWithImages.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import Tour from "../models/tourModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:5000";

const WEBSITE_TOURS_DIR = path.resolve(
  __dirname,
  "../../../website/public/images/tours",
);
const UPLOADS_TOURS_DIR = path.resolve(__dirname, "../uploads/tours");

if (!fs.existsSync(UPLOADS_TOURS_DIR)) {
  fs.mkdirSync(UPLOADS_TOURS_DIR, { recursive: true });
}

// Map tour name keywords → local WebP file in uploads/tours/
const tourImageMap = [
  { keywords: ["k2 base camp trek"], file: "tour_k2.webp" },
  { keywords: ["fairy meadows"], file: "tour_fairy.webp" },
  { keywords: ["nanga parbat base camp trek"], file: "tour_nanga.webp" },
  { keywords: ["broad peak"], file: "tour_broad.webp" },
];

// High-quality Unsplash fallbacks by category/keyword for tours without local images
const fallbackImages = {
  k2: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  gondogoro:
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "snow lake":
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  "rush lake":
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  rakaposhi:
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  patundas:
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
  "k2 expedition":
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  "nanga parbat expedition":
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  gasherbrum:
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  spantik:
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  "laila peak":
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  "grand pakistan":
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  "best of pakistan":
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
  "northern pakistan":
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  "silk road":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  buddhist:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  // Category fallbacks
  trekking:
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  expedition:
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "cultural tour":
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
};

function getLocalImageUrl(tourName) {
  const nameLower = tourName.toLowerCase();
  for (const { keywords, file } of tourImageMap) {
    if (keywords.some((kw) => nameLower.includes(kw))) {
      const srcPath = path.join(WEBSITE_TOURS_DIR, file);
      const destPath = path.join(UPLOADS_TOURS_DIR, file);
      if (fs.existsSync(srcPath)) {
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`📷 Copied: ${file}`);
        }
        return `${BACKEND_BASE_URL}/uploads/tours/${file}`;
      }
    }
  }
  return null;
}

function getFallbackImage(tourName, category) {
  const nameLower = tourName.toLowerCase();
  for (const [keyword, url] of Object.entries(fallbackImages)) {
    if (nameLower.includes(keyword)) return url;
  }
  const catLower = (category || "").toLowerCase();
  for (const [keyword, url] of Object.entries(fallbackImages)) {
    if (catLower.includes(keyword)) return url;
  }
  return "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80";
}

async function seedToursWithImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const tours = await Tour.find({});
    console.log(`Found ${tours.length} tours`);

    let updated = 0;

    for (const tour of tours) {
      // Try to get a local backend image first
      const localUrl = getLocalImageUrl(tour.name);
      const primaryImage =
        localUrl || getFallbackImage(tour.name, tour.category);

      // Build final images array — primary first, keep additional as Unsplash
      const images = [primaryImage];

      await Tour.findByIdAndUpdate(tour._id, { images });
      console.log(`✅ Updated: ${tour.name} → ${primaryImage}`);
      updated++;
    }

    console.log(`\n🎉 Done! Updated ${updated}/${tours.length} tours.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedToursWithImages();
