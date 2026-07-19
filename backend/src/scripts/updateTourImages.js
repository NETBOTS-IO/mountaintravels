/**
 * Script to update tour images in MongoDB with proper working images.
 * Maps tours to relevant Unsplash images based on tour name/category/destination.
 * Run: node src/scripts/updateTourImages.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import Tour from "../models/tourModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Curated, high-quality Pakistan/mountain Unsplash images by theme
const imagesByTheme = {
  k2: [
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
  "fairy-meadows": [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
  ],
  "nanga-parbat": [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
  gondogoro: [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  ],
  "snow-lake": [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
  "rush-lake": [
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  ],
  "broad-peak": [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  ],
  gasherbrum: [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  ],
  spantik: [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
  rakaposhi: [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  ],
  "laila-peak": [
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  ],
  hunza: [
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  ],
  skardu: [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  ],
  lahore: [
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  taxila: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  ],
  chitral: [
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  ],
  kalash: [
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
  ],
  swat: [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
  ],
  kashmir: [
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  ],
  makran: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
  ],
  deosai: [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
  karakoram: [
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
  ],
  "grand-pakistan": [
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    "https://images.unsplash.com/photo-1624313511990-675902801899?w=800&q=80",
  ],
  "silk-road": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  ],
  central_asia: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  ],
};

// Category-based fallbacks
const categoryFallbacks = {
  Trekking: [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
  Expedition: [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80",
  ],
  "Cultural Tour": [
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  "Silk Road Tour": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  ],
  Skiing: [
    "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80",
    "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80",
  ],
  "Mountain Biking": [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  ],
};

function getImagesForTour(tour) {
  const nameLower = (tour.name || "").toLowerCase();
  const idLower = (tour._id?.toString() || "").toLowerCase();
  const destLower = (tour.destination || "").toLowerCase();

  // Try exact keyword matches in name
  for (const [keyword, imgs] of Object.entries(imagesByTheme)) {
    const kw = keyword.replace(/-/g, " ");
    if (nameLower.includes(kw) || nameLower.includes(keyword)) {
      return imgs;
    }
  }

  // Try in destination
  for (const [keyword, imgs] of Object.entries(imagesByTheme)) {
    const kw = keyword.replace(/-/g, " ");
    if (destLower.includes(kw) || destLower.includes(keyword)) {
      return imgs;
    }
  }

  // Category fallback
  const catImages =
    categoryFallbacks[tour.category] || categoryFallbacks.default;
  return catImages;
}

async function updateTourImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const tours = await Tour.find({});
    console.log(`Found ${tours.length} tours to update`);

    let updated = 0;
    for (const tour of tours) {
      // Only update if current images are /uploads/ paths (not real URLs)
      const needsUpdate =
        !tour.images ||
        tour.images.length === 0 ||
        tour.images.every(
          (img) =>
            img.startsWith("/uploads/") ||
            img.startsWith("/assets/tours/") ||
            img.startsWith("/images/") ||
            !img.startsWith("http"),
        );

      if (needsUpdate) {
        const newImages = getImagesForTour(tour);
        await Tour.findByIdAndUpdate(tour._id, { images: newImages });
        console.log(`✅ Updated: ${tour.name} → ${newImages[0]}`);
        updated++;
      } else {
        console.log(`⏭️  Skipped (already has URL): ${tour.name}`);
      }
    }

    console.log(`\n✅ Done. Updated ${updated}/${tours.length} tours.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

updateTourImages();
