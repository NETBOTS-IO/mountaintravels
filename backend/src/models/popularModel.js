import mongoose from "mongoose";

const popularDestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      maxlength: [150, "Name cannot exceed 150 characters"],
    },
    image: {
      type: String, // will store AVIF file path
      required: [true, "Image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    tours: {
      type: Number,
      default: 0,
      min: [0, "Tours cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PopularDestination", popularDestinationSchema);
