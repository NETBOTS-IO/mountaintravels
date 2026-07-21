import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../models/blogModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mtp";

const AUTHORS = ["Akhtar", "Sharafat", "Ghulam"];
const SUB_MENUS = ["Pakistan Guide", "Travel Information"];
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80";

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedFromMD() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to Local DB");

    const contentDir = path.resolve(
      __dirname,
      "../../../website/content/Pillar 1 Pakistan Travel Guide",
    );
    const files = fs
      .readdirSync(contentDir)
      .filter((file) => file.endsWith(".md"));

    const blogsToInsert = [];

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      const lines = fileContent.split("\\n").map((l) => l.trim());

      // The first non-empty line is the title
      let title = "";
      let titleIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
          title = lines[i].replace(/^#+\s*/, ""); // Remove markdown headers
          titleIndex = i;
          break;
        }
      }

      // Collect the next 2-3 non-empty lines for the summary
      let summary = "";
      for (
        let i = titleIndex + 1;
        i < lines.length && summary.length < 150;
        i++
      ) {
        if (lines[i].length > 0) {
          summary += lines[i] + " ";
        }
      }
      summary = summary.trim();
      if (summary.length > 200) summary = summary.substring(0, 197) + "...";
      if (!summary) summary = title;

      // Convert the markdown content to simple HTML paragraphs for the content field
      const htmlContent = lines
        .map((line) => {
          if (!line) return "";
          if (line.startsWith("#"))
            return `<h3>${line.replace(/^#+\s*/, "")}</h3>`;
          if (line.startsWith("-") || line.startsWith("✓"))
            return `<li>${line.replace(/^[-✓]\s*/, "")}</li>`;
          return `<p>${line}</p>`;
        })
        .join("\\n");

      const authorName = getRandomElement(AUTHORS);
      const subMenu = getRandomElement(SUB_MENUS);

      blogsToInsert.push({
        title,
        content: htmlContent,
        author: {
          name: authorName,
          designation: "Travel Expert",
          description: `Expert guide and writer based in Pakistan.`,
          image: "",
        },
        coverImage: DEFAULT_IMAGE,
        category: "Travel Guide", // Must match enum
        subMenu: subMenu,
        isFeatured: Math.random() > 0.7,
        status: "published",
        summary,
        tags: ["Travel", "Pakistan", "Guide"],
        readTime: Math.floor(Math.random() * 5) + 3,
      });
    }

    console.log(`Parsed ${blogsToInsert.length} blogs from Markdown.`);

    await Blog.deleteMany({});
    console.log("Cleared existing blogs.");

    await Blog.insertMany(blogsToInsert);
    console.log(`Successfully inserted ${blogsToInsert.length} blogs.`);
  } catch (error) {
    console.error("Error seeding blogs from MD:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from Local DB.");
    process.exit(0);
  }
}

seedFromMD();
