import PartnerFeedback from "../models/partnerFeedbackModel.js";

class PartnerFeedbackService {
  // Create a new feedback
  async createFeedback(data) {
    return await PartnerFeedback.create(data);
  }

  // List feedbacks with filters, search, sorting, and pagination
  async listFeedbacks(options = {}) {
    const page = Math.max(1, parseInt(options.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(options.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const filters = {};

    // Filter by rating
    if (options.rating) {
      if (typeof options.rating === "string" && options.rating.includes(",")) {
        filters.rating = { $in: options.rating.split(",").map(Number) };
      } else {
        filters.rating = Number(options.rating);
      }
    }

    // Filter by partnership type
    if (options.partnershipType) {
      filters.partnershipType = options.partnershipType;
    }

    // Filter by company
    if (options.company) {
      filters.company = options.company;
    }

    // Search by text
    if (options.search) {
      filters.$text = { $search: options.search };
    }

    // Sorting
    let sort = { createdAt: -1 };
    if (options.sort) {
      const [field, dir] = options.sort.split(":");
      sort = { [field]: dir === "asc" ? 1 : -1 };
    } else if (options.search) {
      sort = { score: { $meta: "textScore" }, createdAt: -1 };
    }

    // Projection for text score
    const projection = {};
    if (filters.$text) {
      projection.score = { $meta: "textScore" };
    }

    const [total, items] = await Promise.all([
      PartnerFeedback.countDocuments(filters),
      PartnerFeedback.find(filters, projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    return {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
      items,
    };
  }

  // Get feedback by ID
  async getFeedbackById(id) {
    return await PartnerFeedback.findById(id);
  }

  // Update feedback
  async updateFeedback(id, data) {
    return await PartnerFeedback.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Delete feedback
  async deleteFeedback(id) {
    return await PartnerFeedback.findByIdAndDelete(id);
  }
}

export default new PartnerFeedbackService();
