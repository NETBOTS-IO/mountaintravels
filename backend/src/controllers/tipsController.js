import TravelTip from "../models/tipsModel.js";

// Create a new TravelTip
export const createTravelTip = async (req, res) => {
  try {
    const { title, excerpt, date, slug } = req.body;

    const newTip = new TravelTip({
      title,
      excerpt,
      image: req.file ? `/uploads/tips/${req.file.filename}` : "", // ✅ from multer
      date: new Date(date),
      slug,
    });

    const savedTip = await newTip.save();
    res.status(201).json({ success: true, data: savedTip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating TravelTip", error: err.message });
  }
};

// Get all TravelTips
export const getTravelTips = async (req, res) => {
  try {
    const tips = await TravelTip.find().sort({ date: -1 });
    res.json({ success: true, data: tips });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching TravelTips", error: err.message });
  }
};

// Get TravelTip by ID
export const getTravelTipById = async (req, res) => {
  try {
    const tip = await TravelTip.findById(req.params.id);
    if (!tip) return res.status(404).json({ success: false, message: "TravelTip not found" });
    res.json({ success: true, data: tip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching TravelTip", error: err.message });
  }
};

// Get TravelTip by slug
export const getTravelTipBySlug = async (req, res) => {
  try {
    const tip = await TravelTip.findOne({ slug: req.params.slug });
    if (!tip) return res.status(404).json({ success: false, message: "TravelTip not found" });
    res.json({ success: true, data: tip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching TravelTip", error: err.message });
  }
};

// Update TravelTip
export const updateTravelTip = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/tips/${req.file.filename}`; // ✅ update image if provided
    }

    const updatedTip = await TravelTip.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedTip) return res.status(404).json({ success: false, message: "TravelTip not found" });
    res.json({ success: true, data: updatedTip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating TravelTip", error: err.message });
  }
};

// Delete TravelTip
export const deleteTravelTip = async (req, res) => {
  try {
    const deletedTip = await TravelTip.findByIdAndDelete(req.params.id);
    if (!deletedTip) return res.status(404).json({ success: false, message: "TravelTip not found" });
    res.json({ success: true, message: "TravelTip deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting TravelTip", error: err.message });
  }
};
