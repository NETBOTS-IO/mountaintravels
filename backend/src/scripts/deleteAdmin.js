import mongoose from 'mongoose';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

async function deleteAdmin(email) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const admin = await User.findOne({ email });
    if (!admin) {
      console.log('Admin not found');
    } else {
      await User.findByIdAndDelete(admin._id);
      console.log(`Admin ${email} deleted successfully`);
    }

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error(err);
  }
}

// Replace with the admin email you want to delete
deleteAdmin('admin@dashboard.com');
