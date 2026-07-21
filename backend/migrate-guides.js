import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import matter from "gray-matter";
import { marked } from "marked";
import sharp from "sharp";
import Blog from "./src/models/blogModel.js";

// Setup paths
const contentDir = path.resolve("../website/content");
const uploadsDir = path.resolve("./uploads/blogs");
const artifactsDir =
  "C:\\Users\\pcp\\.gemini\\antigravity-ide\\brain\\597d7723-af9d-437b-b208-64098bf72b94";

// Database connection
const MONGODB_URI = "mongodb://localhost:27017/mtp";

// Exact files the user requested
const guideMapping = [
  {
    file: "10. Is Pakistan Safe for Tourists.md",
    img: "safe_tourist_pakistan_1784457697212.png",
  },
  {
    file: "13. Buddhist Heritage of Pakistan.md",
    img: "buddhist_heritage_1784457707558.png",
  },
  {
    file: "14. Karakoram Highway Travel Guide.md",
    img: "karakoram_highway_1784457718151.png",
  },
  {
    file: "19. UNESCO World Heritage Sites of Pakistan.md",
    img: "unesco_heritage_1784457728487.png",
  },
  {
    file: "57. Pakistan Mountaineering Guide.md",
    img: "pakistan_mountaineering_1784457745396.png",
  },
  {
    file: "62. Best Time for Climbing in Pakistan.md",
    img: "best_time_climbing_1784457755889.png",
  },
  {
    file: "64. Karakoram Mountaineering Guide.md",
    img: "karakoram_climbing_1784457765805.png",
  },
  {
    file: "65. Himalaya Mountaineering Guide.md",
    img: "himalaya_climbing_1784457775864.png",
  },
  {
    file: "66. Hindu Kush Mountaineering Guide.md",
    img: "hindu_kush_climbing_1784457793989.png",
  },
  { file: "8. Pakistan Visa Guide.md", img: "pakistan_visa_1784457804091.png" },
  {
    file: "9. Best time to visit Pakistan.md",
    img: "best_time_visit_1784457814639.png",
  },
  {
    file: "63. How to Plan an Expedition in Pakistan.md",
    img: "plan_expedition_1784457825069.png",
  },
];

const authors = ["Sharafat Hussain", "Ghulam Muhammad", "Akhtar"];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  for (const mapping of guideMapping) {
    const mdPath = path.join(contentDir, mapping.file);
    if (!fs.existsSync(mdPath)) {
      console.log(`Skipping ${mapping.file} - not found`);
      continue;
    }

    // Read Markdown
    const fileContents = fs.readFileSync(mdPath, "utf8");
    const matterResult = matter(fileContents);

    // Extract title
    let title = matterResult.data.title;
    if (!title) {
      title = mapping.file
        .replace(/^\d+[a-zA-Z]*\.\s*/, "")
        .replace(/\.md$/, "");
    }

    // Convert markdown to HTML
    const htmlContent = marked.parse(matterResult.content);

    // Process Image
    const sourceImgPath = path.join(artifactsDir, mapping.img);
    const webpFilename = `cover-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const destImgPath = path.join(uploadsDir, webpFilename);
    const dbImgPath = `/uploads/blogs/${webpFilename}`;

    if (fs.existsSync(sourceImgPath)) {
      await sharp(sourceImgPath)
        .toFormat("webp", { quality: 50 })
        .toFile(destImgPath);
      console.log(`Processed image for ${title}`);
    } else {
      console.log(`WARNING: Image not found for ${mapping.file}`);
    }

    // Pick random author
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

    // Clean summary
    let cleanSummary =
      matterResult.content
        .replace(/[#*`_>\[\]\n]/g, " ")
        .replace(/\s+/g, " ")
        .substring(0, 150)
        .trim() + "...";

    // Create Blog
    const blog = new Blog({
      title,
      content: htmlContent,
      author: {
        name: randomAuthor,
        designation: "Travel Expert",
        image: "", // Optional
        description: `An expert guide to Pakistan by ${randomAuthor}.`,
      },
      coverImage: fs.existsSync(sourceImgPath) ? dbImgPath : "",
      category: "Travel Guide",
      isFeatured: false,
      status: "published",
      summary: cleanSummary,
      tags: ["Guide", "Pakistan"],
      readTime: 5,
    });

    await blog.save();
    console.log(`Saved blog: ${title}`);

    // Delete original markdown to avoid duplication
    fs.unlinkSync(mdPath);
    console.log(`Deleted markdown: ${mapping.file}`);
  }

  console.log("Migration Complete!");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
