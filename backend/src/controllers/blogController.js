import blogService from "../services/blogService.js";

// GET /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs(req.query);
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

// GET /api/blogs/:id
export const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};

// POST /api/blogs
export const createBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blogData);

    // Handle cover image
    if (req.files && req.files.coverImage && req.files.coverImage[0]) {
      blogData.coverImage = `/uploads/blogs/${req.files.coverImage[0].filename}`;
    } else {
      blogData.coverImage = "/uploads/blogs/placeholder.jpg";
    }

    // Handle author image
    if (req.files && req.files.authorImage && req.files.authorImage[0]) {
      if (!blogData.author) blogData.author = {};
      blogData.author.image = `/uploads/blogs/${req.files.authorImage[0].filename}`;
    }

    const blog = await blogService.createBlog(blogData);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

// PUT /api/blogs/:id
export const updateBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blogData);

    // Get existing blog from DB to preserve current images
    const existingBlog = await blogService.getBlogById(req.params.id);

    // Handle cover image
    if (req.files && req.files.coverImage && req.files.coverImage[0]) {
      blogData.coverImage = `/uploads/blogs/${req.files.coverImage[0].filename}`;
    } else {
      // Preserve existing cover image
      if (existingBlog?.coverImage) {
        blogData.coverImage = existingBlog.coverImage;
      }
    }

    // Handle author image
    if (req.files && req.files.authorImage && req.files.authorImage[0]) {
      if (!blogData.author) blogData.author = {};
      blogData.author.image = `/uploads/blogs/${req.files.authorImage[0].filename}`;
    } else {
      // Preserve existing author image if no new one uploaded
      if (existingBlog?.author?.image && !blogData.author) {
        blogData.author = { ...existingBlog.author };
      } else if (existingBlog?.author?.image && blogData.author) {
        blogData.author.image = existingBlog.author.image;
      }
    }

    const blog = await blogService.updateBlog(req.params.id, blogData);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

// DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
      error: error.message,
    });
  }
};

// GET /api/blogs/search?q=...
export const searchBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs({ search: req.query.q });
    res.status(200).json({
      success: true,
      message: "Search results retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching blogs",
      error: error.message,
    });
  }
};

// GET /api/blogs/popular
export const getPopularBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getPopularBlogs();
    res.status(200).json({
      success: true,
      message: "Popular blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching popular blogs",
      error: error.message,
    });
  }
};

// GET /api/blogs/featured
export const getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getFeaturedBlogs();
    res.status(200).json({
      success: true,
      message: "Featured blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured blogs",
      error: error.message,
    });
  }
};

export const getRelatedBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getRelatedBlogs(req.params.id);
    res.status(200).json({
      success: true,
      message: "Related blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error fetching related blogs",
      error: error.message,
    });
  }
};
