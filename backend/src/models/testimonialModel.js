import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: [150, "Designation cannot exceed 150 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      validate: {
        validator: function (v) {
          return Number.isInteger(v) || (v * 2) % 1 === 0; // Allow integers or half values
        },
        message: "Rating must be a whole number or half value (e.g., 4.5)",
      },
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      trim: true,
      minlength: [10, "Feedback must be at least 10 characters"],
      maxlength: [1000, "Feedback cannot exceed 1000 characters"],
    },
    image: {
      type: String,
    },
    tripName: {
      type: String,
      trim: true,
      maxlength: [200, "Trip name cannot exceed 200 characters"],
    },
    tripDate: {
      type: Date,
      validate: {
        validator: function (v) {
          if (!v) return true; // Optional field
          return v <= new Date(); // Cannot be future date
        },
        message: "Trip date cannot be in the future",
      },
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    highlights: [
      {
        type: String,
        trim: true,
        maxlength: [100, "Each highlight cannot exceed 100 characters"],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
testimonialSchema.index({ verified: 1, isActive: 1 });
testimonialSchema.index({ rating: -1 });

export default mongoose.model("Testimonial", testimonialSchema);
