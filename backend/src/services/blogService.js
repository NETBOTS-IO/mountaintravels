import Blog from '../models/blogModel.js';

class BlogService {
  async createBlog(blogData) {
    return await Blog.create(blogData);
  }

  async getAllBlogs(query = {}) {
    const { page = 1, limit = 10, author, tag, search } = query;
    
    const filter = {};
    if (author) filter.author = author;
    if (tag) filter.tags = tag;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { 'sections.paragraph': { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Blog.countDocuments(filter);

    return {
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    };
  }

  async getBlogById(id) {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  }

  async updateBlog(id, blogData) {
    const blog = await Blog.findByIdAndUpdate(id, blogData, {
      new: true,
      runValidators: true
    });
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  }

  async deleteBlog(id) {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  }

  async searchBlogs(searchQuery) {
    return await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { summary: { $regex: searchQuery, $options: 'i' } },
        { 'sections.paragraph': { $regex: searchQuery, $options: 'i' } }
      ]
    });
  }

  async getPopularBlogs() {
    return await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5);
  }
}

const blogService = new BlogService();
export default blogService; 