import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB:", mongoose.connection.name); // <- prints DB name
    console.log("Collections in DB:", await mongoose.connection.db.listCollections().toArray());
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkDB();
