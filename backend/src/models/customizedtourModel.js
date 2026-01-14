import mongoose from "mongoose";

const customTourSchema = new mongoose.Schema(
  {
    // CUSTOMER INFO
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      whatsapp: { type: String },
      nationality: { type: String },
      contactMethod: {
        type: String,
        enum: ["Email", "WhatsApp", "Phone Call"],
        default: "Email",
      },
    },

    // TOUR DETAILS
    country: { type: String, required: true },
    days: { type: Number, required: true },
    groupSize: { type: String },

    // TRAVEL PREFERENCES
    travelPreferences: {
      startMonth: { type: String },
      budget: { type: String },
      detailsAboutTour: { type: String },
    },

    shortDescription: { type: String },

    source: {
      type: String,
      default: "CUSTOM TOUR FORM",
    },

    status: {
      type: String,
      enum: ["New", "In Progress", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true } // adds createdAt, updatedAt automatically
);

export default mongoose.model("CustomTourRequest", customTourSchema);
