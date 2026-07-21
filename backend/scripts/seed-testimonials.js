import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Testimonial from "../src/models/testimonialModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const fallbackTestimonials = [
  {
    name: "Reinhold Messner",
    tour: "World-Renowned Mountaineer",
    text: "The quality of the service and knowledge of the guides was excellent. Rozi Ali, one of the guides from Mountain Travels, is an old friend of mine.",
  },
  {
    name: "Peter Laurenson",
    tour: "New Zealand Tourist Board",
    text: "Ghulam and his team of highly-experienced guides and support staff stand apart from all the other operators that I've used on account of their unswerving drive to satisfy their customers.",
  },
  {
    name: "Ryo Higashino & Ide Ikutaro",
    tour: "NHK, Japan Corporation, Tokyo",
    text: "We appreciate the efforts of all the highly professional team members organized by Mountain Travels Pakistan whose confidence and dedication made it possible for us to capture some of the breathtaking and rare mountain scenery.",
  },
  {
    name: "Hester Noyon",
    tour: "Amsterdam, The Netherlands",
    text: "Mountain Travels Pakistan surprised us with a very well organized trek to Baltoro and Gondogoro La. You really have found the perfect combination between professionalism and local insight.",
  },
  {
    name: "Kamila Jeevanjee",
    tour: "Los Angeles, CA, USA",
    text: "What a wonderful trek- the care and attention of Hamid and all the porters made a very tough trip extremely pleasant, safe, and not so intimidating.",
  },
  {
    name: "Georg Heel",
    tour: "Tyrol, Austria",
    text: "With an excellent crew, beginning with our guide Ibrahim, the cook Ali who cooked in this area like in a gourmet restaurant, it was an unforgettable experience.",
  },
  {
    name: "Peter Klocknu",
    tour: "Hachenburg, Germany",
    text: "The trek to Baltoro, Concordia, Gondogoro La and Fairy Meadows was really great and perfectly organized by Mountain Travels Pakistan. MTP gave us the feeling to be at home.",
  },
  {
    name: "Galen Murton",
    tour: "Maine, USA",
    text: "Thank you very much to Ghulam Ahmed and everyone at Mountain Travels Pakistan for your excellent and professional services in arranging our trip.",
  },
];

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if testimonials already exist
    const count = await Testimonial.countDocuments();
    if (count > 0) {
      console.log("Testimonials already exist, skipping seeding.");
    } else {
      console.log("Seeding testimonials...");
      const docs = fallbackTestimonials.map((t) => ({
        name: t.name,
        designation: "Guest", // Default since it's required
        location: "International", // Default since it's required
        rating: 5,
        feedback: t.text,
        tripName: t.tour,
        isActive: true,
        verified: true,
      }));

      await Testimonial.insertMany(docs);
      console.log(`Successfully seeded ${docs.length} testimonials.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding testimonials:", error);
    process.exit(1);
  }
};

seedTestimonials();
