import mongoose from "mongoose";

const TravelTipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.TravelTip || mongoose.model("TravelTip", TravelTipSchema);
