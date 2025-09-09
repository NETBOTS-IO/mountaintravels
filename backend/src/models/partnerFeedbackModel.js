import mongoose from "mongoose";

const partnerFeedbackSchema = new mongoose.Schema(
  {
    partnerName: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

// Text index for search across important fields
partnerFeedbackSchema.index({
  partnerName: "text",
  company: "text",
  feedback: "text",
});

export default mongoose.model("PartnerFeedback", partnerFeedbackSchema);
