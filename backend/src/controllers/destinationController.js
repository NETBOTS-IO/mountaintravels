import Destination from "../models/destinationModel.js";
import Tour from "../models/tourModel.js";

const noCache = (res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
};

export const getAllDestinations = async (req, res) => {
  try {
    const { featured, country, region } = req.query;
    const query = {};
    if (featured !== undefined) query.featured = featured === "true";
    if (country) query.country = { $regex: country, $options: "i" };
    if (region) query.region = { $regex: region, $options: "i" };

    let destinations = await Destination.find(query)
      .sort({ featured: -1, name: 1 })
      .lean();

    // Fetch all tours to accurately count matches just like the frontend search logic
    const allTours = await Tour.find(
      {},
      "name destination location category tags",
    ).lean();

    destinations = destinations.map((dest) => {
      const q = (
        dest.shortName || dest.name.split("–")[0].trim()
      ).toLowerCase();
      let matchedCount = 0;

      for (const t of allTours) {
        if (
          t.name?.toLowerCase().includes(q) ||
          t.destination?.toLowerCase().includes(q) ||
          t.location?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
        ) {
          matchedCount++;
        }
      }

      return {
        ...dest,
        tours: matchedCount,
      };
    });
    noCache(res);
    res.json({ success: true, data: destinations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destinations",
      error: error.message,
    });
  }
};

export const getDestinationBySlug = async (req, res) => {
  try {
    let destination = await Destination.findOne({
      slug: req.params.slug,
    }).lean();
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }

    // Fetch all tours to accurately count matches just like the frontend search logic
    const allTours = await Tour.find(
      {},
      "name destination location category tags",
    ).lean();

    const q = (
      destination.shortName || destination.name.split("–")[0].trim()
    ).toLowerCase();
    let matchedCount = 0;

    for (const t of allTours) {
      if (
        t.name?.toLowerCase().includes(q) ||
        t.destination?.toLowerCase().includes(q) ||
        t.location?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q))
      ) {
        matchedCount++;
      }
    }

    destination.tours = matchedCount;

    noCache(res);
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destination",
      error: error.message,
    });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    noCache(res);
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching destination",
      error: error.message,
    });
  }
};

export const createDestination = async (req, res) => {
  try {
    const data = { ...req.body };

    // Parse array/JSON fields sent via FormData
    if (data.highlights && typeof data.highlights === "string") {
      try {
        data.highlights = JSON.parse(data.highlights);
      } catch (e) {
        data.highlights = data.highlights.split(",").map((s) => s.trim());
      }
    }
    if (data.suggestedTours && typeof data.suggestedTours === "string") {
      try {
        data.suggestedTours = JSON.parse(data.suggestedTours);
      } catch (e) {
        data.suggestedTours = data.suggestedTours
          .split(",")
          .map((s) => s.trim());
      }
    }
    if (data.tags && typeof data.tags === "string") {
      try {
        data.tags = JSON.parse(data.tags);
      } catch (e) {
        data.tags = data.tags.split(",").map((s) => s.trim());
      }
    }

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        data.image = req.files.image[0].url;
      }
      if (req.files.images && req.files.images.length > 0) {
        data.images = req.files.images.map((f) => f.url);
      }
    }

    const destination = await Destination.create(data);
    noCache(res);
    res.status(201).json({
      success: true,
      message: "Destination created",
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating destination",
      error: error.message,
    });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const data = { ...req.body };

    // Parse array/JSON fields sent via FormData
    if (data.highlights && typeof data.highlights === "string") {
      try {
        data.highlights = JSON.parse(data.highlights);
      } catch (e) {
        data.highlights = data.highlights.split(",").map((s) => s.trim());
      }
    }
    if (data.suggestedTours && typeof data.suggestedTours === "string") {
      try {
        data.suggestedTours = JSON.parse(data.suggestedTours);
      } catch (e) {
        data.suggestedTours = data.suggestedTours
          .split(",")
          .map((s) => s.trim());
      }
    }
    if (data.tags && typeof data.tags === "string") {
      try {
        data.tags = JSON.parse(data.tags);
      } catch (e) {
        data.tags = data.tags.split(",").map((s) => s.trim());
      }
    }

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        data.image = req.files.image[0].url;
      }
      if (req.files.images && req.files.images.length > 0) {
        data.images = req.files.images.map((f) => f.url);
      }
    }

    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true },
    );
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    noCache(res);
    res.json({
      success: true,
      message: "Destination updated",
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating destination",
      error: error.message,
    });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    noCache(res);
    res.json({ success: true, message: "Destination deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting destination",
      error: error.message,
    });
  }
};
