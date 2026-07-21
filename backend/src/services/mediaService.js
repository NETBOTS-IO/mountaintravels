import Media from "../models/mediaModel.js";

class MediaService {
  async createMedia(mediaData) {
    return await Media.create(mediaData);
  }

  async getAllMedia(query = {}) {
    const { page = 1, limit = 15, category, type, search } = query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (type && type !== "All") filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { photographer: { $regex: search, $options: "i" } },
      ];
    }
    const media = await Media.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Media.countDocuments(filter);
    return {
      media,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    };
  }

  async getMediaById(id) {
    const item = await Media.findById(id);
    if (!item) {
      throw new Error("Media item not found");
    }
    return item;
  }

  async updateMedia(id, mediaData) {
    const item = await Media.findByIdAndUpdate(id, mediaData, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      throw new Error("Media item not found");
    }
    return item;
  }

  async deleteMedia(id) {
    const item = await Media.findByIdAndDelete(id);
    if (!item) {
      throw new Error("Media item not found");
    }
    return item;
  }
}

export default new MediaService();
