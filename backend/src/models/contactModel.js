import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String },
  interests: { type: String },
  source: { type: String, default: "CONTACT FORM" },
}, { timestamps: true }); // adds createdAt, updatedAt

export default mongoose.model("Contact", contactSchema);
