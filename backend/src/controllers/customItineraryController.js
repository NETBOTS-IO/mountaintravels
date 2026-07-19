import CustomItinerary from "../models/customItineraryModel.js";

export const createCustomItinerary = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      destinations,
      duration,
      travelers,
      budget,
      travelDate,
      details,
    } = req.body;

    const newItinerary = await CustomItinerary.create({
      name,
      email,
      phone,
      destinations,
      duration,
      travelers,
      budget,
      travelDate,
      details,
    });

    return res.status(201).json({
      success: true,
      message: "Custom itinerary request submitted successfully.",
      data: newItinerary,
    });
  } catch (err) {
    console.error("Error creating custom itinerary:", err);
    next(err);
  }
};

export const getCustomItineraries = async (req, res, next) => {
  try {
    const list = await CustomItinerary.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: list,
    });
  } catch (err) {
    console.error("Error fetching custom itineraries:", err);
    next(err);
  }
};
