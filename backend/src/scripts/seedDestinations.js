/**
 * Seed Destinations Script
 * - Copies destination WebP images from website/public/images/destinations/ to backend/src/uploads/destinations/
 * - Seeds 9 destination records into MongoDB with backend image URLs
 * Run: node src/scripts/seedDestinations.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import Destination from "../models/destinationModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:5000";

const WEBSITE_IMAGES_DIR = path.resolve(
  __dirname,
  "../../../website/public/images/destinations",
);
const UPLOADS_DEST_DIR = path.resolve(__dirname, "../uploads/destinations");

// Ensure uploads/destinations exists
if (!fs.existsSync(UPLOADS_DEST_DIR)) {
  fs.mkdirSync(UPLOADS_DEST_DIR, { recursive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Destination data (full rich content from destinationsContent.ts)
// ─────────────────────────────────────────────────────────────────────────────
const destinations = [
  {
    slug: "hunza-valley",
    shortName: "Hunza Valley",
    name: "Hunza Valley – Jewel of the Karakoram",
    description:
      "Nestled amidst some of the world's highest mountains, Hunza Valley is one of Pakistan's most celebrated destinations. Renowned for its breathtaking scenery, hospitable communities, historic forts, and Silk Road heritage, Hunza offers visitors an unforgettable blend of culture and nature.",
    highlights: [
      "Baltit Fort",
      "Altit Fort",
      "Attabad Lake",
      "Passu Cones",
      "Hussaini Suspension Bridge",
      "Khunjerab National Park",
      "Khunjerab Pass",
    ],
    appeal:
      "Whether you are interested in photography, cultural exploration, trekking, or simply enjoying spectacular mountain scenery, Hunza Valley is an essential destination on any Pakistan itinerary.",
    suggestedTours: [
      "Hunza Valley Discovery",
      "Northern Pakistan Highlights",
      "Silk Route Explorer",
    ],
    imageFile: "dest_hunza.webp",
    country: "Pakistan",
    region: "Gilgit-Baltistan",
    tours: 12,
    featured: true,
    tags: ["mountains", "silk-road", "culture", "trekking", "forts"],
  },
  {
    slug: "skardu-baltistan",
    shortName: "Skardu & Baltistan",
    name: "Skardu & Baltistan – Gateway to the World's Greatest Mountains",
    description:
      "Located in the heart of Baltistan, Skardu serves as the gateway to K2, Broad Peak, Gasherbrum, and many of the world's most famous mountain landscapes. The region is renowned for its dramatic scenery, crystal-clear lakes, ancient forts, and welcoming Balti culture.",
    highlights: [
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Lower Kachura Lake",
      "Satpara Lake",
      "Shigar Fort",
      "Khaplu Palace",
      "Deosai National Park",
      "Manthoka Waterfall",
    ],
    appeal:
      "Skardu is equally appealing to cultural travelers, nature enthusiasts, photographers, and mountaineers.",
    suggestedTours: [
      "Skardu & Baltistan Explorer",
      "Deosai Adventure",
      "K2 Base Camp Trek",
    ],
    imageFile: "dest_skardu.webp",
    country: "Pakistan",
    region: "Gilgit-Baltistan",
    tours: 15,
    featured: true,
    tags: ["k2", "mountains", "lakes", "forts", "baltistan"],
  },
  {
    slug: "gilgit-baltistan",
    shortName: "Gilgit-Baltistan",
    name: "Gilgit-Baltistan – Land of Giants",
    description:
      "Gilgit-Baltistan is home to five of the world's fourteen peaks above 8,000 meters and some of the most spectacular mountain scenery anywhere on Earth. Travelers can experience dramatic landscapes while discovering centuries-old traditions and communities.",
    highlights: [
      "Towering 8,000m peaks",
      "Ancient Silk Road settlements",
      "Glaciers and alpine meadows",
      "Rich cultural diversity",
      "Historic trade routes",
    ],
    appeal:
      "Travelers can experience dramatic landscapes while discovering centuries-old traditions and communities that have thrived in these mountains for generations.",
    suggestedTours: [
      "Grand Northern Pakistan Tour",
      "Karakoram Highway Journey",
      "Silk Road Adventure",
    ],
    imageFile: "dest_gilgit.webp",
    country: "Pakistan",
    region: "Gilgit-Baltistan",
    tours: 10,
    featured: true,
    tags: ["mountains", "8000m", "glaciers", "silk-road", "karakoram"],
  },
  {
    slug: "chitral-kalash",
    shortName: "Chitral & Kalash",
    name: "Chitral & Kalash Valleys – A Cultural Treasure",
    description:
      "The remote valleys of Chitral and Kalash provide one of the most unique cultural experiences in Asia. Surrounded by the rugged peaks of the Hindu Kush, the Kalash people have preserved distinctive traditions, festivals, and beliefs for centuries.",
    highlights: [
      "Bumburet Valley",
      "Rumbur Valley",
      "Birir Valley",
      "Chitral Town",
      "Chitral Fort",
      "Traditional Kalash Festivals",
    ],
    appeal:
      "Visitors gain fascinating insights into one of the region's most distinctive cultures while enjoying spectacular mountain scenery.",
    suggestedTours: [
      "Kalash Culture Tour",
      "Chitral Explorer",
      "Northern Cultural Journey",
    ],
    imageFile: "dest_chitral.webp",
    country: "Pakistan",
    region: "Khyber Pakhtunkhwa",
    tours: 6,
    featured: false,
    tags: ["kalash", "culture", "festivals", "hindu-kush", "unique"],
  },
  {
    slug: "swat-valley",
    shortName: "Swat Valley",
    name: "Swat Valley – The Switzerland of Pakistan",
    description:
      "Known for its lush green valleys, alpine scenery, rivers, forests, and rich history, Swat Valley has long been one of Pakistan's most beloved travel destinations.",
    highlights: [
      "Mingora",
      "Malam Jabba",
      "Fizagat Park",
      "White Palace",
      "Buddhist Heritage Sites",
      "Kalam Valley",
      "Ushu Forest",
      "Mahodand Lake",
    ],
    appeal:
      "Swat combines natural beauty with cultural and historical significance, making it ideal for families, photographers, and nature lovers.",
    suggestedTours: [
      "Swat Valley Tour",
      "Family Adventure Pakistan",
      "Cultural Heritage Journey",
    ],
    imageFile: "dest_swat.webp",
    country: "Pakistan",
    region: "Khyber Pakhtunkhwa",
    tours: 5,
    featured: false,
    tags: ["green-valleys", "buddhist", "alpine", "rivers", "forests"],
  },
  {
    slug: "kashmir",
    shortName: "Kashmir",
    name: "Kashmir – Paradise on Earth",
    description:
      "The breathtaking valleys of Azad Kashmir offer some of Pakistan's most picturesque landscapes, characterized by rolling hills, rivers, forests, and alpine meadows.",
    highlights: [
      "Neelum Valley",
      "Keran",
      "Arang Kel",
      "Sharda",
      "Ratti Gali Lake",
      "Pir Chinasi",
    ],
    appeal:
      "Kashmir is particularly attractive to travelers seeking scenic beauty, tranquility, and outdoor adventure.",
    suggestedTours: [
      "Kashmir Explorer",
      "Scenic Pakistan Journey",
      "Nature & Photography Tour",
    ],
    imageFile: "dest_kashmir.webp",
    country: "Pakistan",
    region: "Azad Kashmir",
    tours: 4,
    featured: false,
    tags: ["paradise", "lakes", "alpine-meadows", "scenic", "neelum"],
  },
  {
    slug: "lahore",
    shortName: "Lahore",
    name: "Lahore – Cultural Capital of Pakistan",
    description:
      "Lahore is a vibrant city where history, culture, architecture, and cuisine come together to create an unforgettable travel experience.",
    highlights: [
      "Lahore Fort",
      "Badshahi Mosque",
      "Walled City",
      "Shalimar Gardens",
      "Lahore Museum",
      "Wagah Border Ceremony",
      "Traditional Food Streets",
    ],
    appeal:
      "The city's rich heritage and lively atmosphere make it one of South Asia's most fascinating cultural destinations.",
    suggestedTours: [
      "Heritage Pakistan Tour",
      "Grand Pakistan Tour",
      "Mughal Heritage Journey",
    ],
    imageFile: "dest_lahore.webp",
    country: "Pakistan",
    region: "Punjab",
    tours: 8,
    featured: true,
    tags: ["mughal", "heritage", "food", "culture", "architecture"],
  },
  {
    slug: "taxila",
    shortName: "Taxila",
    name: "Taxila – Cradle of Gandhara Civilization",
    description:
      "A UNESCO World Heritage Site, Taxila is one of the most important archaeological destinations in Asia and a key center of Buddhist heritage.",
    highlights: [
      "Dharmarajika Stupa",
      "Jaulian Monastery",
      "Sirkap",
      "Taxila Museum",
      "Ancient Buddhist Sites",
    ],
    appeal:
      "Taxila provides unique insights into the Gandhara Civilization and the spread of Buddhism across Asia.",
    suggestedTours: [
      "Buddhist Heritage Tour",
      "Gandhara Civilization Tour",
      "Archaeological Pakistan",
    ],
    imageFile: "dest_taxila.webp",
    country: "Pakistan",
    region: "Punjab",
    tours: 4,
    featured: false,
    tags: ["unesco", "buddhist", "gandhara", "archaeological", "heritage"],
  },
  {
    slug: "makran-coast",
    shortName: "Makran Coast",
    name: "Makran Coast – Pakistan's Hidden Coastal Wonder",
    description:
      "Stretching along the Arabian Sea, the Makran Coast offers dramatic landscapes, pristine beaches, fascinating geological formations, and a completely different side of Pakistan.",
    highlights: [
      "Hingol National Park",
      "Princess of Hope",
      "Kund Malir Beach",
      "Buzi Pass",
      "Mud Volcanoes",
      "Coastal Highway",
    ],
    appeal:
      "The region is ideal for adventurous travelers seeking off-the-beaten-path experiences.",
    suggestedTours: [
      "Makran Coastal Adventure",
      "Balochistan Explorer",
      "Photography Expedition",
    ],
    imageFile: "dest_makran.webp",
    country: "Pakistan",
    region: "Balochistan",
    tours: 3,
    featured: false,
    tags: ["coastal", "beach", "adventure", "balochistan", "national-park"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────────────────
async function seedDestinations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    let seeded = 0;
    let skipped = 0;

    for (const dest of destinations) {
      // Copy image file to backend uploads if it exists
      const srcImage = path.join(WEBSITE_IMAGES_DIR, dest.imageFile);
      const destImage = path.join(UPLOADS_DEST_DIR, dest.imageFile);

      let imageUrl = `${BACKEND_BASE_URL}/uploads/destinations/${dest.imageFile}`;

      if (fs.existsSync(srcImage)) {
        fs.copyFileSync(srcImage, destImage);
        console.log(`📷 Copied: ${dest.imageFile}`);
      } else {
        console.warn(`⚠️  Image not found, using placeholder: ${srcImage}`);
        imageUrl =
          "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80";
      }

      // Upsert destination (update if exists, create if not)
      const { imageFile, ...destData } = dest;
      await Destination.findOneAndUpdate(
        { slug: dest.slug },
        { ...destData, image: imageUrl },
        { upsert: true, new: true },
      );

      console.log(`✅ Seeded: ${dest.name}`);
      seeded++;
    }

    console.log(
      `\n🎉 Done! Seeded ${seeded} destinations, skipped ${skipped}.`,
    );
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding destinations:", err);
    process.exit(1);
  }
}

seedDestinations();
