import mongoose from "mongoose";
import Blog from "./src/models/blogModel.js";

async function run() {
  await mongoose.connect("mongodb://localhost:27017/mtp");
  console.log("Connected to DB");

  const blogs = await Blog.find({ category: "Travel Guide" });
  console.log(`Found ${blogs.length} travel guides`);

  let count = 0;
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    // If it doesn't have a subMenu, assign one
    if (!blog.subMenu) {
      // Alternate between the two menus
      blog.subMenu = i % 2 === 0 ? "Pakistan Guide" : "Travel Information";
      await blog.save();
      count++;
      console.log(`Updated "${blog.title}" -> ${blog.subMenu}`);
    }
  }

  console.log(`Successfully updated ${count} blogs!`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
