import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    title: { type: String, default: "Untitled Media", trim: true },
    src: [{ type: String, required: true }], // Array of media URLs
    category: { type: String, default: "Uncategorized" },
    type: { type: String, enum: ["image", "video"], default: "image" },
    location: { type: String },
    date: { type: String },
    description: { type: String },
    photographer: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Media", mediaSchema);
