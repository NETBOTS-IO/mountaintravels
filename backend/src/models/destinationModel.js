import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortName: { type: String, trim: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    appeal: { type: String },
    suggestedTours: [{ type: String }],
    image: { type: String }, // primary image URL (from backend uploads or https)
    images: [{ type: String }], // additional images
    country: { type: String, default: "Pakistan" },
    region: { type: String },
    tours: { type: Number, default: 0 }, // total tour count for display
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("Destination", destinationSchema);
