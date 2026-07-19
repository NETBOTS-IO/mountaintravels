import mongoose from "mongoose";

const customItinerarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    destinations: { type: [String], required: true },
    duration: { type: String, required: true },
    travelers: { type: Number, required: true },
    budget: { type: String, required: true },
    travelDate: { type: Date, required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "CONTACTED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export default mongoose.model("CustomItinerary", customItinerarySchema);
