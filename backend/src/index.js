import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import tourRoutes from './routes/tourRoutes.js';
import entryRoutes from './routes/entriesRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import partnerFeedbackRoutes from "./routes/partnerFeedbackRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import popularRoutes from './routes/popularRoutes.js';
import tipsRoutes from './routes/tipsRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import trustedRoutes from './routes/trustedRoutes.js';





dotenv.config();
console.log("MongoDB URI:", process.env.MONGODB_URI);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://mountaintravels.site",
  "https://mountaintravels.com",
  "http://mountaintravels.com",
  "https://www.mountaintravels.site",
  "https://api.mountaintravels.site",
  "http://dashboard.mountaintravels.com",
  "https://dashboard.mountaintravels.com",
  "http://api.mountaintravels.com",
  "https://api.mountaintravels.com",
  "http://api.mountaintravels.site",
  "https://api.mountaintravels.site",
  "https://dashboard.mountaintravels.site",
  "http://dashboard.mountaintravels.site",
  "https://dashboard.mountaintravels.com",
  "http://dashboard.mountaintravels.com",

];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


// Routes
app.get('/', (req, res)=>{
    res.send('Mountaintravel Server is running');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Content management routes
app.use('/api/tours', tourRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use("/api/partner-feedbacks", partnerFeedbackRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/popular', popularRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api', bookingRoutes);
app.use("/api/trusted", trustedRoutes);



// app.use('/api/inquiries', inquiryRoutes);
// app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    success: false,
    status,
    message,
    error: err.stack
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
        console.log(`MongoDB connected`);
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 