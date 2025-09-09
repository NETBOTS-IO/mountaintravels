import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directory exists
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, "../uploads/popular"); // default

    if (req.originalUrl.includes("/tours")) {
      if (file.fieldname === "images") {
        uploadPath = path.join(__dirname, "../uploads/tours");
      } else if (file.fieldname === "itineraryImages") {
        uploadPath = path.join(__dirname, "../uploads/itineraries");
      }
    } else if (req.originalUrl.includes("/blogs")) {
      uploadPath = path.join(__dirname, "../uploads/blogs");
    } else if (req.originalUrl.includes("/gallery")) {
      uploadPath = path.join(__dirname, "../uploads/gallery");
    } else if (req.originalUrl.includes("/testimonials")) {
      uploadPath = path.join(__dirname, "../uploads/testimo");
    } else if (req.originalUrl.includes("/partner-feedbacks")) {
      uploadPath = path.join(__dirname, "../uploads/partners");
    } else if (req.originalUrl.includes("/tips")) {
      uploadPath = path.join(__dirname, "../uploads/tips");
    } else if (req.originalUrl.includes("/trusted")) {
      uploadPath = path.join(__dirname, "../uploads/trusted");
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});


// File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);
  if (!isValid) {
    return cb(
      new Error("Only image files (JPEG, JPG, PNG, GIF) are allowed!"),
      false
    );
  }
  if (file.size === 0) {
    return cb(new Error("File is empty"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  preservePath: true,
});
export const convertToAvif = async (req, res, next) => {
  try {
    // Case 1: Single file upload
    if (req.file) {
      const filePath = req.file.path;
      const avifPath = filePath.replace(path.extname(filePath), ".avif");

      await sharp(filePath)
        .toFormat("avif", { quality: 50 })
        .toFile(avifPath);

      fs.unlinkSync(filePath); // remove original
      req.file.filename = path.basename(avifPath);
      req.file.path = avifPath;

      req.body.image = `/uploads/${path.basename(path.dirname(avifPath))}/${req.file.filename}`;
    }

    // Case 2: Multiple files upload (req.files from upload.fields or upload.array)
    if (req.files) {
      for (const field in req.files) {
        req.files[field] = await Promise.all(
          req.files[field].map(async (file) => {
            const filePath = file.path;
            const avifPath = filePath.replace(path.extname(filePath), ".avif");

            await sharp(filePath)
              .toFormat("avif", { quality: 50 })
              .toFile(avifPath);

            fs.unlinkSync(filePath); // remove original

            return {
              ...file,
              filename: path.basename(avifPath),
              path: avifPath,
              url: `/uploads/${path.basename(path.dirname(avifPath))}/${path.basename(avifPath)}`, // ✅ useful for saving in DB
            };
          })
        );
      }
    }

    next();
  } catch (error) {
    console.error("Error converting to AVIF:", error);
    next(error);
  }
};

export default upload;
