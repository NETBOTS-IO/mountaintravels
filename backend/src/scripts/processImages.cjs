const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const sharp = require('sharp');

const artifactDir = 'C:/Users/pcp/.gemini/antigravity-ide/brain/ba1e6e32-9f49-4a06-968d-fba2f37fdbfd';
const destUploads = path.join(__dirname, '../../uploads/destinations');
const tourUploads = path.join(__dirname, '../../uploads/tours');

if (!fs.existsSync(destUploads)) fs.mkdirSync(destUploads, { recursive: true });
if (!fs.existsSync(tourUploads)) fs.mkdirSync(tourUploads, { recursive: true });

const LOCAL_URL = 'http://localhost:5000';

async function downloadImage(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Predefined high-quality mountain/landscape Unsplash photos
const fallbackPhotos = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
  'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=1200&q=80',
  'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80',
  'https://images.unsplash.com/photo-1624313511990-675902801899?w=1200&q=80'
];

async function getValidImageBuffer(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const url = fallbackPhotos[Math.floor(Math.random() * fallbackPhotos.length)];
      return await downloadImage(url);
    } catch (e) {
      console.log('Retry download...', e.message);
    }
  }
  throw new Error('All retries failed for image download');
}

const geminiImages = {
  'Hunza Valley – Jewel of the Karakoram': 'dest_hunza_valley_1784626276888.png',
  'Skardu & Baltistan – Gateway to the World\'s Greatest Mountains': 'dest_skardu_baltistan_1784626287393.png',
  'Gilgit-Baltistan – Land of Giants': 'dest_gilgit_baltistan_1784626302244.png',
  'Chitral & Kalash Valleys – A Cultural Treasure': 'dest_chitral_kalash_1784626312676.png',
  'Kashmir – Paradise on Earth': 'dest_kashmir_1784626330992.png',
};

async function run() {
  await mongoose.connect('mongodb://localhost:27017/mtp');
  console.log('Connected to DB');

  // 1. Destinations
  const destinations = await mongoose.connection.db.collection('destinations').find({}).toArray();
  for (const dest of destinations) {
    const destName = dest.name || 'Unknown';
    const safeName = destName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const webpFileName = `dest_${safeName}.webp`;
    const outputPath = path.join(destUploads, webpFileName);

    let buffer;
    try {
      if (geminiImages[destName]) {
        const srcPath = path.join(artifactDir, geminiImages[destName]);
        console.log(`Processing Gemini image for ${destName}...`);
        buffer = fs.readFileSync(srcPath);
      } else {
        console.log(`Downloading Unsplash image for ${destName}...`);
        buffer = await getValidImageBuffer();
      }

      await sharp(buffer).resize(1200, 800, { fit: 'cover' }).webp({ quality: 80 }).toFile(outputPath);
      await mongoose.connection.db.collection('destinations').updateOne(
        { _id: dest._id },
        { $set: { image: `${LOCAL_URL}/uploads/destinations/${webpFileName}` } }
      );
      console.log(`Updated destination: ${destName}`);
    } catch(err) {
      console.log(`Failed to process image for ${destName}:`, err.message);
    }
  }

  // 2. Tours
  const tours = await mongoose.connection.db.collection('tours').find({}).toArray();
  for (const tour of tours) {
    const tourName = tour.title || tour.name || 'Unknown Tour';
    const safeName = tourName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const tourImageUrls = [];

    console.log(`Processing 3 images for tour: ${tourName}...`);
    for (let i = 0; i < 3; i++) {
      const webpFileName = `tour_${safeName}_${i + 1}.webp`;
      const outputPath = path.join(tourUploads, webpFileName);
      
      try {
        const buffer = await getValidImageBuffer();
        await sharp(buffer).resize(1200, 800, { fit: 'cover' }).webp({ quality: 80 }).toFile(outputPath);
        tourImageUrls.push(`${LOCAL_URL}/uploads/tours/${webpFileName}`);
      } catch(err) {
        console.log(`Failed to process image ${i+1} for ${tourName}:`, err.message);
      }
    }

    if (tourImageUrls.length > 0) {
      await mongoose.connection.db.collection('tours').updateOne(
        { _id: tour._id },
        { $set: { images: tourImageUrls } }
      );
      console.log(`Updated tour: ${tourName}`);
    }
  }

  console.log('Done!');
  process.exit(0);
}

run().catch(console.error);
