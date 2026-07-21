import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/mtp";

// Map tour names (partial) to the actual image files available in uploads/tours
const tourImageMap = [
  { nameIncludes: "K2 Base Camp", image: "/uploads/tours/tour_k2.webp" },
  { nameIncludes: "K2 Expedition", image: "/uploads/tours/tour_k2.webp" },
  { nameIncludes: "Gondogoro", image: "/uploads/tours/tour_k2.webp" },
  { nameIncludes: "Snow Lake", image: "/uploads/tours/tour_k2.webp" },
  { nameIncludes: "Rush Lake", image: "/uploads/tours/tour_k2.webp" },
  { nameIncludes: "Rakaposhi", image: "/uploads/tours/tour_broad.webp" },
  { nameIncludes: "Patundas", image: "/uploads/tours/tour_broad.webp" },
  { nameIncludes: "Broad Peak", image: "/uploads/tours/tour_broad.webp" },
  { nameIncludes: "Gasherbrum", image: "/uploads/tours/tour_broad.webp" },
  { nameIncludes: "Spantik", image: "/uploads/tours/tour_broad.webp" },
  {
    nameIncludes: "Nanga Parbat Base Camp",
    image: "/uploads/tours/tour_fairy.webp",
  },
  {
    nameIncludes: "Nanga Parbat Expedition",
    image: "/uploads/tours/tour_nanga.webp",
  },
  { nameIncludes: "Laila Peak", image: "/uploads/tours/tour_nanga.webp" },
  {
    nameIncludes: "Grand Pakistan",
    image: "/uploads/destinations/dest_lahore.webp",
  },
  {
    nameIncludes: "Best of Pakistan",
    image: "/uploads/destinations/dest_lahore.webp",
  },
  {
    nameIncludes: "Northern Pakistan",
    image: "/uploads/destinations/dest_hunza.webp",
  },
  { nameIncludes: "Silk Road", image: "/uploads/destinations/dest_hunza.webp" },
  {
    nameIncludes: "Buddhist Heritage",
    image: "/uploads/destinations/dest_taxila.webp",
  },
];

async function fixTourImages() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.useDb("mtp");
  const tours = await db.collection("tours").find({}).toArray();

  console.log(`Found ${tours.length} tours`);

  for (const tour of tours) {
    const match = tourImageMap.find((m) => tour.name.includes(m.nameIncludes));
    const newImage = match ? match.image : "/uploads/tours/tour_k2.webp"; // fallback

    // Update images array - set first image to the correct one
    await db
      .collection("tours")
      .updateOne({ _id: tour._id }, { $set: { images: [newImage] } });
    console.log(`Updated: ${tour.name} => ${newImage}`);
  }

  console.log("Done!");
  process.exit(0);
}

fixTourImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
