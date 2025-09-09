import mongoose from "mongoose";

const TravelTipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: false }, // will hold "/uploads/tips/filename.avif"
    date: { type: Date, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.TravelTip || mongoose.model("TravelTip", TravelTipSchema);
