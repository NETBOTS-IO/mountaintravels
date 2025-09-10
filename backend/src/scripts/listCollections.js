import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function listAllCollections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let col of collections) {
      const documents = await mongoose.connection.db.collection(col.name).find({}).toArray();
      console.log(`Collection: ${col.name}`);
      console.log(documents);
      console.log('-----------------------------------');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

listAllCollections();
