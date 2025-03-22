import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  subheading: { type: String, required: true },
  image: { type: String },
  paragraph: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  sections: [sectionSchema],
  author: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  summary: { type: String, required: true },
  tags: [{ type: String }],
  readTime: { type: Number, required: true },
  time: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema); 