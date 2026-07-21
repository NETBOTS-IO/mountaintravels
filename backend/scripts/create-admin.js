import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../src/models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = "saqlainshahbaltee@gmail.com";
    const password = "admin123";
    const firstName = "Saqlain";
    const lastName = "Shah";

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("Admin user already exists:", email);
      // Optional: update password
      user.password = password;
      await user.save();
      console.log("Updated password for existing admin.");
    } else {
      user = new User({
        email,
        password,
        firstName,
        lastName,
        role: "admin",
        isActive: true,
      });
      await user.save();
      console.log("Created new admin user:", email);
    }

    console.log("---------------------------");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("---------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
