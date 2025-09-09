import Testimonial from '../models/testimonialModel.js';

class TestimonialService {
    // Create a new testimonial
    async createTestimonial(testimonialData) {
      try {
        const testimonial = new Testimonial(testimonialData);
        await testimonial.save();
        return testimonial;
      } catch (error) {
        throw error;
      }
    }
  
    // Get all testimonials with filtering, sorting, and pagination
    async getTestimonials(filters = {}, options = {}) {
      try {
        const {
          page = 1,
          limit = 10,
          sortBy = 'createdAt',
          sortOrder = 'desc',
          rating,
          verified,
          isActive = true
        } = options;
  
        // Build query
        const query = { isActive };
        
        if (rating) query.rating = rating;
        if (verified !== undefined) query.verified = verified;
        if (filters.name) query.name = new RegExp(filters.name, 'i');
        if (filters.location) query.location = new RegExp(filters.location, 'i');
        if (filters.tripName) query.tripName = new RegExp(filters.tripName, 'i');
  
        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
        // Execute query with pagination
        const skip = (page - 1) * limit;
        
        const [testimonials, total] = await Promise.all([
          Testimonial.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .lean(),
          Testimonial.countDocuments(query)
        ]);
  
        return {
          testimonials,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: parseInt(limit)
          }
        };
      } catch (error) {
        throw error;
      }
    }
  
    // Get a single testimonial by ID
    async getTestimonialById(id) {
      try {
        const testimonial = await Testimonial.findOne({ _id: id, isActive: true });
        return testimonial;
      } catch (error) {
        throw error;
      }
    }
  
    // Update a testimonial
    async updateTestimonial(id, updateData) {
      try {
        const testimonial = await Testimonial.findOneAndUpdate(
          { _id: id, isActive: true },
          { ...updateData, updatedAt: new Date() },
          { new: true, runValidators: true }
        );
        return testimonial;
      } catch (error) {
        throw error;
      }
    }
  
    // Delete a testimonial
    async deleteTestimonial(id) {
      try {
        const testimonial = await Testimonial.findByIdAndDelete(id);
        return testimonial;
      } catch (error) {
        throw error;
      }
    }
  
    // Get testimonial statistics
    async getTestimonialStats() {
      try {
        const stats = await Testimonial.aggregate([
          { $match: { isActive: true } },
          {
            $group: {
              _id: null,
              totalTestimonials: { $sum: 1 },
              verifiedTestimonials: {
                $sum: { $cond: ['$verified', 1, 0] }
              },
              averageRating: { $avg: '$rating' },
              ratingDistribution: {
                $push: '$rating'
              }
            }
          },
          {
            $addFields: {
              averageRating: { $round: ['$averageRating', 1] }
            }
          }
        ]);
  
        if (stats.length === 0) {
          return {
            totalTestimonials: 0,
            verifiedTestimonials: 0,
            averageRating: 0,
            ratingDistribution: []
          };
        }
  
        return stats[0];
      } catch (error) {
        throw error;
      }
    }
  
    // Get featured testimonials (verified and high rating)
    async getFeaturedTestimonials(limit = 6) {
      try {
        const testimonials = await Testimonial.find({
          isActive: true,
          verified: true,
          rating: { $gte: 4 }
        })
        .sort({ rating: -1, createdAt: -1 })
        .limit(limit)
        .lean();
  
        return testimonials;
      } catch (error) {
        throw error;
      }
    }
  
    // Toggle verification status
    async toggleVerification(id) {
      try {
        const testimonial = await Testimonial.findOne({ _id: id, isActive: true });
        if (!testimonial) {
          throw new Error('Testimonial not found');
        }
  
        testimonial.verified = !testimonial.verified;
        testimonial.updatedAt = new Date();
        await testimonial.save();
  
        return testimonial;
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default new TestimonialService();