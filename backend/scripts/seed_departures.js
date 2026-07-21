// Script to add 2 fixed departure dates for every tour
import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/mtp";

// Two upcoming departure dates (fixed, realistic season dates)
const DEPARTURE_DATES = [
  { month: 5, day: 15 }, // June 15, 2025
  { month: 8, day: 1 }, // September 1, 2025
];

async function addDepartures() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.useDb("mtp");

  const tours = await db.collection("tours").find({}).toArray();
  console.log(`Found ${tours.length} tours`);

  // Clear existing departures first
  await db.collection("departures").deleteMany({});
  console.log("Cleared existing departures");

  const year = 2025;
  let inserted = 0;

  for (const tour of tours) {
    const price = tour.price || 1200;

    for (const d of DEPARTURE_DATES) {
      const date = new Date(year, d.month, d.day);
      const spotsLeft = Math.floor(Math.random() * 8) + 3; // 3-10 spots left
      const status = spotsLeft <= 4 ? "LIMITED" : "AVAILABLE";

      await db.collection("departures").insertOne({
        tripId: tour._id,
        date,
        price,
        maxSpots: 16,
        spotsLeft,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      inserted++;
    }

    console.log(`✓ Added 2 departures for: ${tour.name.substring(0, 40)}`);
  }

  console.log(
    `\n✅ Done! Inserted ${inserted} departure records for ${tours.length} tours.`,
  );
  process.exit(0);
}

addDepartures().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
