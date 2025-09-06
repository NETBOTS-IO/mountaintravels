import testimonialService from "../services/testimonialService.js";

// Create new testimonial
export const createTestimonial = async (req, res) => {
  try {
    // Handle file upload
    const testimonialData = req.body;
    if (req.file) {
      testimonialData.image = `/uploads/testimo/${req.file.filename}`;
    }

    // Handle highlights
    if (testimonialData.highlights) {
      if (Array.isArray(testimonialData.highlights)) {
        // Already an array, no need to do anything
      } else if (typeof testimonialData.highlights === "string") {
        try {
          // Try to parse as JSON
          testimonialData.highlights = JSON.parse(testimonialData.highlights);
        } catch (e) {
          // If not valid JSON, split by comma
          testimonialData.highlights = testimonialData.highlights
            .split(",")
            .map((h) => h.trim());
        }
      }
    }

    const testimonial = await testimonialService.createTestimonial(
      testimonialData
    );

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const filters = {
      name: req.query.name,
      location: req.query.location,
      tripName: req.query.tripName,
    };

    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      rating: req.query.rating,
      verified: req.query.verified,
    };

    const result = await testimonialService.getTestimonials(filters, options);

    res.status(200).json({
      success: true,
      message: "Testimonials retrieved successfully",
      data: result.testimonials,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve testimonials",
      error: error.message,
    });
  }
};

// Get single testimonial
export const getTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(
      req.params.id
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial retrieved successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve testimonial",
      error: error.message,
    });
  }
};

// Update testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const updateData = req.body;

    // Handle file upload
    if (req.file) {
      updateData.image = `/uploads/testimo/${req.file.filename}`;
    }

    // Handle highlights
    if (updateData.highlights) {
      if (Array.isArray(updateData.highlights)) {
        // Already an array, no need to do anything
      } else if (typeof updateData.highlights === "string") {
        try {
          // Try to parse as JSON
          updateData.highlights = JSON.parse(updateData.highlights);
        } catch (e) {
          // If not valid JSON, split by comma
          updateData.highlights = updateData.highlights
            .split(",")
            .map((h) => h.trim());
        }
      }
    }

    const testimonial = await testimonialService.updateTestimonial(
      req.params.id,
      updateData
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// Delete testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialService.deleteTestimonial(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

// Get testimonial statistics
export const getStats = async (req, res) => {
  try {
    const stats = await testimonialService.getTestimonialStats();

    res.status(200).json({
      success: true,
      message: "Statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve statistics",
      error: error.message,
    });
  }
};

// Get featured testimonials
export const getFeaturedTestimonials = async (req, res) => {
  try {
    const limit = req.query.limit || 6;
    const testimonials = await testimonialService.getFeaturedTestimonials(
      limit
    );

    res.status(200).json({
      success: true,
      message: "Featured testimonials retrieved successfully",
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve featured testimonials",
      error: error.message,
    });
  }
};

// Toggle verification status
export const toggleVerification = async (req, res) => {
  try {
    const testimonial = await testimonialService.toggleVerification(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: `Testimonial ${
        testimonial.verified ? "verified" : "unverified"
      } successfully`,
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to toggle verification",
      error: error.message,
    });
  }
};
