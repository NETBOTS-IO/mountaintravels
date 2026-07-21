import mediaService from "../services/mediaService.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getMediaUrls = (files) => {
  if (!files || !files.src) return [];
  return files.src.map((file) => `/uploads/media/${file.filename}`);
};

export const getAllMedia = async (req, res) => {
  try {
    const result = await mediaService.getAllMedia(req.query);
    res.json({
      success: true,
      message: "Media items fetched successfully",
      photos: result.media, // using key "photos" for backward compatibility with website/dashboard
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching media items",
      error: error.message,
    });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const item = await mediaService.getMediaById(req.params.id);
    res.json({
      success: true,
      message: "Media item fetched successfully",
      data: item,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Media item not found",
      error: error.message,
    });
  }
};

export const createMedia = async (req, res) => {
  try {
    if (req.files && req.files.src) {
      req.body.src = getMediaUrls(req.files);

      const firstFile = req.files.src[0];
      if (
        firstFile &&
        firstFile.mimetype &&
        firstFile.mimetype.startsWith("video/")
      ) {
        req.body.type = "video";
      } else if (firstFile && firstFile.type === "video") {
        req.body.type = "video";
      } else {
        req.body.type = "image";
      }
    }

    if (typeof req.body.src === "string") {
      req.body.src = [req.body.src];
    }

    if (!req.body.type && req.body.src && req.body.src.length > 0) {
      const ext = req.body.src[0].split(".").pop().split("?")[0].toLowerCase();
      if (["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext)) {
        req.body.type = "video";
      } else {
        req.body.type = "image";
      }
    }

    const item = await mediaService.createMedia(req.body);
    res.status(201).json({
      success: true,
      message: "Media item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating media item",
      error: error.message,
    });
  }
};

export const updateMedia = async (req, res) => {
  try {
    let newSrc = [];
    if (req.files && req.files.src) {
      newSrc = getMediaUrls(req.files);

      const firstFile = req.files.src[0];
      if (
        firstFile &&
        firstFile.mimetype &&
        firstFile.mimetype.startsWith("video/")
      ) {
        req.body.type = "video";
      } else if (firstFile && firstFile.type === "video") {
        req.body.type = "video";
      } else {
        req.body.type = "image";
      }
    }

    if (typeof req.body.src === "string") {
      req.body.src = [req.body.src];
    }

    if (Array.isArray(req.body.src)) {
      req.body.src = [...req.body.src, ...newSrc];
    } else if (newSrc.length > 0) {
      req.body.src = newSrc;
    }

    if (!req.body.type && req.body.src && req.body.src.length > 0) {
      const ext = req.body.src[0].split(".").pop().split("?")[0].toLowerCase();
      if (["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(ext)) {
        req.body.type = "video";
      } else {
        req.body.type = "image";
      }
    }

    const item = await mediaService.updateMedia(req.params.id, req.body);
    res.json({
      success: true,
      message: "Media item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Media item not found or update failed",
      error: error.message,
    });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    await mediaService.deleteMedia(req.params.id);
    res.json({
      success: true,
      message: "Media item deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Media item not found or delete failed",
      error: error.message,
    });
  }
};

export const streamVideo = async (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, "../../uploads/media", filename);

  try {
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({
        success: false,
        message: "Video file not found",
      });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            "Requested range not satisfiable\n" + start + " >= " + fileSize,
          );
        return;
      }

      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error streaming video",
      error: error.message,
    });
  }
};
