import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    author: {
      name: { type: String, required: true, trim: true },
      designation: { type: String, required: true, trim: true },
      image: { type: String },
      description: { type: String, required: true, trim: true },
    },
    coverImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
      enum: [
        "Destinations",
        "Travel Tips",
        "Cultural Guides",
        "Adventure",
        "Food & Places",
        "Luxury",
        "Trekking",
        "Wildlife",
        "Culture",
        "Others",
      ],
    },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    summary: { type: String, required: true },
    tags: { type: [String], index: true, default: [] },
    readTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
