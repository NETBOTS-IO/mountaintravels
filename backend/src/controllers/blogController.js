import Blog from '../models/blogModel.js';
import upload from '../utils/multerConfig.js'; // Remove { } since it's a default export
import blogService from '../services/blogService.js';

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    res.json({
      success: true,
      message: 'Blog fetched successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

// export const createBlog = [
//   upload.fields([
//     { name: 'coverImage', maxCount: 1 },
//     { name: 'subheadingImages', maxCount: 10 }
//   ]),
//   async (req, res) => {
//     try {
//       const blogData = JSON.parse(req.body.blogData);
      
//       // Handle cover image
//       if (req.files.coverImage) {
//         blogData.coverImage = `/uploads/blogs/${req.files.coverImage[0].filename}`;
//       }

//       // Handle subheading images
//       if (req.files.subheadingImages) {
//         let currentImageIndex = 0;
//         blogData.subheadings = blogData.subheadings.map(subheading => {
//           if (subheading.hasImage) {
//             const image = req.files.subheadingImages[currentImageIndex];
//             currentImageIndex++;
//             return {
//               ...subheading,
//               image: `/uploads/blogs/${image.filename}`
//             };
//           }
//           return subheading;
//         });
//       }

//       const blog = await Blog.create(blogData);
//       res.status(201).json({
//         success: true,
//         message: 'Blog created successfully',
//         data: blog
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Error creating blog',
//         error: error.message
//       });
//     }
//   }
// ];





// export const updateBlog = [
//   upload.fields([
//     { name: 'coverImage', maxCount: 1 },
//     { name: 'subheadingImages', maxCount: 10 }
//   ]),
//   async (req, res) => {
//     try {
//       const blogData = JSON.parse(req.body.blogData);
      
//       // Handle cover image
//       if (req.files.coverImage) {
//         blogData.coverImage = `/uploads/blogs/${req.files.coverImage[0].filename}`;
//       }

//       // Handle subheading images
//       if (req.files.subheadingImages) {
//         let currentImageIndex = 0;
//         blogData.subheadings = blogData.subheadings.map(subheading => {
//           if (subheading.hasImage && !subheading.image.includes('/uploads/')) {
//             const image = req.files.subheadingImages[currentImageIndex];
//             currentImageIndex++;
//             return {
//               ...subheading,
//               image: `/uploads/blogs/${image.filename}`
//             };
//           }
//           return subheading;
//         });
//       }

//       const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
//       if (!blog) {
//         return res.status(404).json({
//           success: false,
//           message: 'Blog not found'
//         });
//       }
//       res.json({
//         success: true,
//         message: 'Blog updated successfully',
//         data: blog
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Error updating blog',
//         error: error.message
//       });
//     }
//   }
// ];

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

export const searchBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.searchBlogs(req.query.q);
    res.status(200).json({
      success: true,
      message: 'Search results retrieved successfully',
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getPopularBlogs();
    res.status(200).json({
      success: true,
      message: 'Popular blogs retrieved successfully',
      data: blogs
    });
  } catch (error) {
    next(error);
  }
}; 