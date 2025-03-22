import express from 'express';
import { getAllBlogs, getBlogById, deleteBlog } from '../controllers/blogController.js';
import { blogValidation } from '../middlewares/validation.js';
import { handleValidationErrors } from '../middlewares/errorHandler.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes
// router.post('/', blogValidation, handleValidationErrors, createBlog);
// router.put('/:id', blogValidation, handleValidationErrors, updateBlog);
router.delete('/:id', deleteBlog);

// GET /api/blogs - Get all blogs
// GET /api/blogs/:id - Get blog by ID
// POST /api/blogs - Create new blog
// PUT /api/blogs/:id - Update blog
// DELETE /api/blogs/:id - Delete blog

export default router; 