import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Blog from "../models/blogModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mtp";

async function restoreBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to Local DB");

    const backupPath = path.resolve(
      __dirname,
      "../../backups/prod-backup-2026-07-21/blogs.json",
    );
    if (!fs.existsSync(backupPath)) {
      console.error("Backup file not found at", backupPath);
      process.exit(1);
    }

    const blogsData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));

    // Convert string IDs back to ObjectIds if necessary, though Mongoose handles this on insert.
    // Also remove __v if present.
    const cleanedBlogs = blogsData.map((blog) => {
      const { __v, ...rest } = blog;
      return rest;
    });

    console.log(`Found ${cleanedBlogs.length} blogs in backup.`);

    await Blog.deleteMany({});
    console.log("Cleared existing blogs in Local DB.");

    await Blog.insertMany(cleanedBlogs);
    console.log(
      `Successfully restored ${cleanedBlogs.length} blogs to Local DB.`,
    );
  } catch (error) {
    console.error("Error restoring blogs:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from Local DB.");
    process.exit(0);
  }
}

restoreBlogs();
