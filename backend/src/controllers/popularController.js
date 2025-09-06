import PopularDestination from "../models/popularModel.js";

// Create
export const createDestination = async (req, res) => {
  try {
    const { name, description, tours } = req.body;

    const destination = new PopularDestination({
      name,
      description,
      tours,
      image: req.file ? `/uploads/popular/${req.file.filename}` : "",
    });

    await destination.save();
    res
      .status(201)
      .json({ success: true, message: "Destination created", data: destination });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Validation error", error: err.message });
  }
};

// Get all
export const getDestinations = async (req, res) => {
  try {
    const destinations = await PopularDestination.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      message: "Destinations retrieved successfully",
      data: destinations,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching destinations", error: err.message });
  }
};

// Get by ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await PopularDestination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: destination });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching destination", error: err.message });
  }
};

// Update
export const updateDestination = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/popular/${req.file.filename}`;
    }

    const destination = await PopularDestination.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!destination)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Destination updated", data: destination });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Update failed", error: err.message });
  }
};

// Delete
export const deleteDestination = async (req, res) => {
  try {
    const destination = await PopularDestination.findByIdAndDelete(req.params.id);
    if (!destination)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Destination deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Delete failed", error: err.message });
  }
};
