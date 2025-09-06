import mongoose from "mongoose";

const trustedCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // image URL or path
});

export default mongoose.model("TrustedCompany", trustedCompanySchema);
