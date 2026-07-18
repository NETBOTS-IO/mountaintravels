/**
 * Seed Departures Script
 * Creates fixed departures dates for all tours loaded in the database.
 * Run: node src/scripts/seedDepartures.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import Tour from "../models/tourModel.js";
import { Departure } from "../models/bookingModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const departureMonthsOffset = [2, 3, 4, 5, 6]; // Seed departures for future months

async function seedDepartures() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected\n");

    const tours = await Tour.find({});
    console.log(`📊 Found ${tours.length} tours to seed departures for.\n`);

    let departuresCreated = 0;

    for (const tour of tours) {
      // Remove existing departures to avoid duplication
      await Departure.deleteMany({ tripId: tour._id });

      const basePrice = tour.price || 1500;

      // Create 3 departures dates for each tour
      const departuresToCreate = departureMonthsOffset
        .slice(0, 3)
        .map((monthOffset, index) => {
          const date = new Date();
          date.setMonth(date.getMonth() + monthOffset);
          date.setDate(15 + index * 5); // 15th, 20th, 25th of that future month

          return {
            tripId: tour._id,
            date: date,
            price: basePrice,
            maxSpots: 20,
            spotsLeft: 15 - index,
            status: index === 2 ? "LIMITED" : "AVAILABLE",
          };
        });

      const result = await Departure.insertMany(departuresToCreate);
      departuresCreated += result.length;
      console.log(`  ✈️ Seeded ${result.length} departures for: ${tour.name}`);
    }

    console.log("\n========================================");
    console.log(`🎉 Departures Seeding complete!`);
    console.log(`   ✅ Created: ${departuresCreated} departures`);
    console.log("========================================\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Departures seeding failed:", error.message);
    process.exit(1);
  }
}

seedDepartures();
