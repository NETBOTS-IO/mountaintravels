import TrustedCompany from "../models/trustedModel.js";

// Create
export const createCompany = async (req, res) => {
  try {
    const companyData = {
      ...req.body,
      image: req.body.image || null, // ✅ ensure image is saved if uploaded
    };

    const company = new TrustedCompany(companyData);
    await company.save();

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all
export const getCompanies = async (req, res) => {
  try {
    const companies = await TrustedCompany.find();
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by id
export const getCompanyById = async (req, res) => {
  try {
    const company = await TrustedCompany.findById(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update
export const updateCompany = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.body.image) {
      updateData.image = req.body.image; // ✅ replace logo if new one uploaded
    }

    const company = await TrustedCompany.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete
export const deleteCompany = async (req, res) => {
  try {
    await TrustedCompany.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
