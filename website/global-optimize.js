const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "public");
const codeDirs = ["app", "components", "data"];

async function walkDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImages() {
  const allFiles = await walkDir(publicDir);
  const images = allFiles.filter((f) => f.match(/\.(jpg|jpeg|png)$/i));

  let replaceMap = [];

  for (const file of images) {
    const ext = path.extname(file);
    const newFile = file.replace(new RegExp(ext + "$", "i"), ".webp");

    // Relative path for code replacement
    const oldRelPath = file.replace(publicDir, "").replace(/\\/g, "/");
    const newRelPath = newFile.replace(publicDir, "").replace(/\\/g, "/");

    console.log(`Converting ${oldRelPath} -> ${newRelPath}`);
    try {
      await sharp(file).webp({ quality: 80 }).toFile(newFile);
      fs.unlinkSync(file); // remove old file
      replaceMap.push({ old: oldRelPath, new: newRelPath });
    } catch (e) {
      console.error(`Failed to convert ${file}`, e);
    }
  }

  // Now replace in codebase
  for (const dir of codeDirs) {
    const codePath = path.join(__dirname, dir);
    if (!fs.existsSync(codePath)) continue;
    const codeFiles = await walkDir(codePath);

    for (const cfile of codeFiles) {
      if (!cfile.match(/\.(tsx|ts|js|jsx|md|css)$/i)) continue;

      let content = fs.readFileSync(cfile, "utf8");
      let changed = false;

      for (const map of replaceMap) {
        // Find occurrences of old path, case insensitive just in case, but let's do exact match first
        // Often paths omit the leading slash or use specific formats. We'll do a simple global replace.
        // E.g. "/images/skardu.jpg"
        const regex = new RegExp(
          map.old.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
          "g",
        );
        if (regex.test(content)) {
          content = content.replace(regex, map.new);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(cfile, content, "utf8");
        console.log(`Updated references in ${cfile.replace(__dirname, "")}`);
      }
    }
  }

  console.log("Global image optimization complete!");
}

optimizeImages();
