const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const generatedDir = path.join(__dirname, "public/images/generated");
const destsDir = path.join(__dirname, "public/images/destinations");
const toursDir = path.join(__dirname, "public/images/tours");

// Ensure destination directories exist
if (!fs.existsSync(destsDir)) fs.mkdirSync(destsDir, { recursive: true });
if (!fs.existsSync(toursDir)) fs.mkdirSync(toursDir, { recursive: true });

async function processImages() {
  const files = fs.readdirSync(generatedDir);

  for (const file of files) {
    if (!file.endsWith(".png") && !file.endsWith(".jpg")) continue;

    // Strip timestamp: e.g., dest_hunza_1784446362231.png -> dest_hunza.webp
    const baseName = file.split("_").slice(0, 2).join("_"); // dest_hunza
    const newName = `${baseName}.webp`;

    const isDest = file.startsWith("dest_");
    const targetDir = isDest ? destsDir : toursDir;
    const targetPath = path.join(targetDir, newName);

    console.log(`Optimizing ${file} -> ${targetPath}`);

    try {
      await sharp(path.join(generatedDir, file))
        .webp({ quality: 80 })
        .toFile(targetPath);
    } catch (e) {
      console.error(`Failed to process ${file}:`, e);
    }
  }

  console.log("Optimization complete.");
}

processImages();
