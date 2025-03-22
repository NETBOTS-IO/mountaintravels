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

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
const allowedOrigins = [
  "http://147.93.94.137",
  "httpa://147.93.94.137",
  
  "http://mountaintravels.site",
  "https://mountaintravels.site",
  "http://dashboard.mountaintravels.site",
  "https://dashboard.mountaintravels.site",
  "http://api.mountaintravels.site",
  "https://api.mountaintravels.site",

  "http://mountaintravels.com",
  "https://mountaintravels.com",
  "http://dashboard.mountaintravels.com",
  "https://dashboard.mountaintravels.com",
  "http://api.mountaintravels.com",
  "https://api.mountaintravels.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


// Routes
app.get('/', (req, res)=>{
    res.send('Mountain Travel Pakistan Server is running');
});
app.use('/api/tours', tourRoutes);
app.use('/api/entry', entryRoutes);

// app.use('/api/blogs', blogRoutes);
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