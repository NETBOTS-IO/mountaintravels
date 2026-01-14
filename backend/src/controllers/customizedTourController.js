import CustomTourRequest from "../models/customizedtourModel.js";
import { sendCustomTourEmail } from "../utils/sendEmail.js";
import { sendCustomTourConfirmationEmail } from "../utils/sendEamilToUser.js";

// CREATE
export const createCustomTour = async (req, res) => {
  try {
    const tour = await CustomTourRequest.create(req.body);

    // SEND EMAIL AFTER SAVE
    await sendCustomTourEmail(tour);

    res.status(201).json({
      success: true,
      message: "Custom tour request submitted",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllCustomTours = async (req, res) => {
  try {
    const tours = await CustomTourRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE
export const getCustomTourById = async (req, res) => {
  try {
    const tour = await CustomTourRequest.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateCustomTour = async (req, res) => {
  try {
    const tour = await CustomTourRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    // If status changed to Approved, send email to client
    if (req.body.status === "Approved") {
      await sendCustomTourConfirmationEmail (tour);
    }

    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteCustomTour = async (req, res) => {
  try {
    await CustomTourRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
