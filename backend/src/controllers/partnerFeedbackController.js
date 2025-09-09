import partnerFeedbackService from "../services/partnerFeedbackService.js";

export const createFeedback = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      logo: req.file ? `/uploads/partners/${req.file.filename}` : null,
    };
    const feedback = await partnerFeedbackService.createFeedback(data);
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
};

export const getAllFeedbacks = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      sort: req.query.sort,
      rating: req.query.rating,
      company: req.query.company,
    };
    const feedbacks = await partnerFeedbackService.listFeedbacks(options);
    res.status(200).json({ success: true, ...feedbacks });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await partnerFeedbackService.getFeedbackById(
      req.params.id
    );
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
};

export const updateFeedback = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ...(req.file && { logo: `/uploads/partners/${req.file.filename}` }),
    };
    const updated = await partnerFeedbackService.updateFeedback(
      req.params.id,
      data
    );
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteFeedback = async (req, res, next) => {
  try {
    const deleted = await partnerFeedbackService.deleteFeedback(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};
