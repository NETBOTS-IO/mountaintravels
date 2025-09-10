import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function checkAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;

    const collectionsToCheck = ['admins', 'admin'];
    for (const colName of collectionsToCheck) {
      const collection = db.collection(colName);
      const admins = await collection.find({}).toArray();
      console.log(`\nCollection: ${colName}`);
      console.log(admins);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error checking admins:", err);
  }
}

checkAdmins();
