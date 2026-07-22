const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// The 12 tours mapping
const toursList = [
    { name: "Pakistan Private Tours", mdFile: "11. Pakistan Private Tours.md", folder: "pakistan-private-tours" },
    { name: "Luxury Pakistan Tours", mdFile: "12. Luxury Pakistan Tours.md", folder: "luxury-pakistan-tours" },
    { name: "Buddhist Heritage of Pakistan", mdFile: "13. Buddhist Heritage of Pakistan.md", folder: "buddhist-heritage" },
    { name: "Silk Route Tours", mdFile: "15. Silk Route Tours.md", folder: "silk-route-tours" },
    { name: "Central Asia Tours", mdFile: "16. Central Asia Tours.md", folder: "central-asia-tours" },
    { name: "Pakistan Cultural Tour", mdFile: "17. Pakistan Cultural Tour.md", folder: "pakistan-cultural-tour" },
    { name: "Northern Pakistan Tours", mdFile: "18. Northern Pakistan Tours.md", folder: "northern-pakistan-tours" },
    { name: "Best of Pakistan Tour", mdFile: "20. Best of Pakistan Tour.md", folder: "best-of-pakistan" },
    { name: "Grand Pakistan Tour", mdFile: "5ai. Grand Pakistan Tour.md", folder: "grand-pakistan-tour" },
    { name: "K2 Base Camp Trek", mdFile: "27. K2 Base Camp Trek.md", folder: "k2-base-camp" },
    { name: "Snow Lake Trek", mdFile: "29. Snow Lake Trek.md", folder: "snow-lake-trek" },
    { name: "Nanga Parbat Base Camp Trek", mdFile: "30. Nanga Parbat Base Camp Trek.md", folder: "nanga-parbat-base-camp" }
];

function parseMarkdown(content) {
    const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const tour = {
        name: lines[0],
        shortDescription: lines.length > 1 ? lines[1] : '',
        overview: '',
        longDescription: '',
        itinerary: [],
        highlights: [],
        images: []
    };

    let currentSection = '';
    let currentDay = null;

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];

        if (line.match(/^Day\s+\d+/i) || line.match(/^Days\s+\d+/i)) {
            if (currentDay) tour.itinerary.push(currentDay);
            currentDay = {
                day: tour.itinerary.length + 1,
                title: line,
                description: '',
                activities: [],
                accommodation: 'Hotel/Camp',
                meals: ['Breakfast', 'Lunch', 'Dinner'],
                location: '',
                type: 'Travel',
                highlights: [],
                images: []
            };
            currentSection = 'itinerary';
            continue;
        }

        if (line.match(/^(Overview|Trek Overview|Tour Overview)/i)) {
            currentSection = 'overview';
            continue;
        } else if (line.match(/^(Highlights|Trek Highlights|Tour Highlights)/i)) {
            currentSection = 'highlights';
            continue;
        }

        if (currentSection === 'overview') {
            tour.overview += line + ' ';
            tour.longDescription += line + ' ';
        } else if (currentSection === 'highlights' && line.startsWith('✓')) {
            tour.highlights.push(line.replace('✓', '').trim());
        } else if (currentSection === 'itinerary' && currentDay) {
            currentDay.description += line + ' ';
        }
    }
    if (currentDay) tour.itinerary.push(currentDay);

    return tour;
}

async function migrate() {
    try {
        console.log("Connecting to local MongoDB...");
        await mongoose.connect('mongodb://localhost:27017/mtp');
        const db = mongoose.connection.db;

        // Process each tour
        for (const t of toursList) {
            const mdPath = path.join('e:/projects/mountaintravels/website/content', t.mdFile);
            if (fs.existsSync(mdPath)) {
                const content = fs.readFileSync(mdPath, 'utf8');
                const parsed = parseMarkdown(content);
                
                // Construct basic tour object
                const updateDoc = {
                    $set: {
                        name: t.name,
                        shortDescription: parsed.shortDescription || parsed.name,
                        overview: parsed.overview || "Overview not available.",
                        longDescription: parsed.longDescription || "Description not available.",
                        itinerary: parsed.itinerary.length > 0 ? parsed.itinerary : [],
                        highlights: parsed.highlights,
                        slug: t.folder, // Important for URLs
                        updatedAt: new Date()
                    }
                };
                
                // Get image paths
                const uploadsFolder = path.join('e:/projects/mountaintravels/backend/uploads/tours', t.folder);
                if (fs.existsSync(uploadsFolder)) {
                    const files = fs.readdirSync(uploadsFolder).filter(f => f.endsWith('.webp') || f.endsWith('.png'));
                    const imagePaths = files.map(f => `/uploads/tours/${t.folder}/${f}`);
                    if (imagePaths.length > 0) {
                        updateDoc.$set.images = imagePaths;
                    }
                }

                // Upsert into local DB
                // Use a regex to match names closely (e.g. "K2 Base Camp Trek" vs "K2 Base Camp Trek (Baltoro)")
                const regexName = new RegExp(t.name.split(' ')[0] + '.*' + (t.name.split(' ')[1] || ''), 'i');
                const existing = await db.collection('tours').findOne({ name: regexName });
                
                if (existing) {
                    console.log(`Updating existing tour: ${existing.name}`);
                    await db.collection('tours').updateOne({ _id: existing._id }, updateDoc);
                } else {
                    console.log(`Creating new tour: ${t.name}`);
                    updateDoc.$set.createdAt = new Date();
                    updateDoc.$set.price = 3000;
                    updateDoc.$set.rating = 5.0;
                    await db.collection('tours').insertOne(updateDoc.$set);
                }
            } else {
                console.log(`Markdown file not found: ${t.mdFile}`);
            }
        }

        console.log("Local DB update complete.");
        
        // Now fetch all tours to copy to prod
        const allLocalTours = await db.collection('tours').find({}).toArray();
        console.log(`Fetched ${allLocalTours.length} tours from local DB.`);
        
        // Disconnect local
        await mongoose.disconnect();

        // Connect to Prod
        console.log("Connecting to PROD MongoDB...");
        const PROD_URI = "mongodb://mtpUser:MountainTravels%40110@147.93.94.137:27017/mountaintravels?authSource=mountaintravels";
        await mongoose.connect(PROD_URI);
        const prodDb = mongoose.connection.db;

        console.log("Deleting existing tours on PROD...");
        await prodDb.collection('tours').deleteMany({});

        console.log("Inserting local tours into PROD...");
        await prodDb.collection('tours').insertMany(allLocalTours);

        console.log("MIGRATION COMPLETE!");
        process.exit(0);

    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
