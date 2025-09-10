// src/scripts/listAdmins.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // load .env

// Admin schema (adjust according to your actual schema)
const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  active: Boolean,
  permissions: Object,
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema, 'admin'); // 'admin' is the actual collection name

async function listAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const admins = await Admin.find({});
    console.log('Admin users in DB:');
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Name: ${admin.firstName} ${admin.lastName}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Active: ${admin.active}`);
      console.log(`   Password Hash: ${admin.password}`);
      console.log(`   Permissions: ${JSON.stringify(admin.permissions)}`);
      console.log('------------------------------------');
    });

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error('Error listing admins:', err);
  }
}

listAdmins();
