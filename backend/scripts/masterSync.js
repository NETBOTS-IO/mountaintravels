/**
 * MASTER SYNC SCRIPT
 * ==================
 * 1. Check local DB for tours, destinations, testimonials
 * 2. Seed missing data into local DB
 * 3. Backup production DB collections to JSON files
 * 4. Push local data to production DB
 * 5. Create admin user on production DB
 *
 * Run: node scripts/masterSync.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── DB URLs ──────────────────────────────────────────────────────────────────
const LOCAL_URI = "mongodb://localhost:27017/mtp";
const PROD_URI =
  "mongodb://mtpUser:MountainTravels%40110@147.93.94.137:27017/mountaintravels?authSource=mountaintravels";

// ─── Backup directory ─────────────────────────────────────────────────────────
const BACKUP_DIR = path.join(
  __dirname,
  "../backups",
  `prod-backup-${new Date().toISOString().slice(0, 10)}`,
);
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

// ─── Collections to sync ──────────────────────────────────────────────────────
const COLLECTIONS = [
  "tours",
  "destinations",
  "testimonials",
  "users",
  "blogs",
  "medias",
  "populars",
  "trustedpartners",
  "contacts",
  "customitinenaries",
  "bookings",
];

// ─── Testimonials seed data ───────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Michel Troillet",
    designation: "Team Leader, July 1990 Swiss Expedition",
    feedback:
      "The complete success of our expedition has to be credited to the overall quality of the preparation done by Mountain Travels Pakistan.",
    location: "Switzerland",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Katsutoshi Kanai",
    designation: "Director, Gyosei Corporation, Japan - December 3rd, 1990",
    feedback:
      "Without the kind assistance of Mountain Travels Pakistan, Mr. Hiroki Fujita (renowned Japanese photographer), could not have accomplished his work in the high-altitude mountains of Pakistan.",
    location: "Japan",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Dan Mozena",
    designation: "Political Attache, American Embassy, Islamabad - July 1996",
    feedback:
      "Ghulam brings energy and excitement to any outdoor adventure...his enthusiasm is infectious, keeping his fellow travelers in high spirits.",
    location: "USA",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Evan Brigham",
    designation: "Trek Coordinator, (ISI) - September 1998",
    feedback:
      "Taking a group of junior and senior high school students into the Northern Areas of Pakistan is a challenge, to say the least! With Ghulam and his friendly and efficient team at Mountain Travels Pakistan in charge though, I'm always 100% confident. We are very glad we switched to booking our semi-annual treks with them a couple of years back – they really provide the best!",
    location: "USA",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Reinhold Messner",
    designation: "The world's eminent mountaineer – October 30th, 1997",
    feedback:
      "On my recent spring 2000 expedition, I was happy to work with Mountain Travels Pakistan. The quality of the service and knowledge of the guides was excellent. Rozi Ali, one of the guides from Mountain Travels, is an old friend of mine – serving as cook and guide on many of my expeditions. I wish him and Mountain Travels Pakistan all the best for the future.",
    location: "Italy",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Peter Laurenson",
    designation: "New Zealand Tourist Board – July 1998",
    feedback:
      "Ghulam and his team of highly-experienced guides and support staff stand apart from all the other operators that I've used on account of their unswerving drive to satisfy their customers, whilst having a lot of fun on the way...having spent 28 days on the trail with them on two separate occasions, I, without hesitation, recommend them to anyone.",
    location: "New Zealand",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Ryo Higashino & Ide Ikutaro",
    designation: "NHK, Japan Corporation, Tokyo, Japan – September 28th, 2000",
    feedback:
      "(We) visited Northern Pakistan for filming an educational documentary on the natural beauty and people of Baltistan in 2000 (and)… appreciate the efforts of all the highly professional team members organized by Mountain Travels Pakistan whose confidence and dedication made it possible for us to capture some of the breathtaking and rare mountain scenery...The credit for this successful venture goes to our Liaison Officer Mr. Hamid Hussain from Mountain Travels whose knowledge about the area and perfect Japanese made our trip easier.",
    location: "Japan",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Hester Noyon",
    designation: "Amsterdam, The Netherland – July 28th, 2004",
    feedback:
      "Mountain Travels Pakistan surprised us with a very well organized trek to Baltoro and Gondogoro La. You really have found the perfect combination between professionalism and local insight and culture. That's the secret of your success! Friendly, compassionate!",
    location: "Netherlands",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Marten Van Asseldunk",
    designation: "Ueghel, Holland – September, 2004",
    feedback:
      "I thank Hamid and his brothers (Ghulam Ahmad & Farman Baltistani) for the excellent preparation and trek which they organized for me and my three teenage daughters. It was a wonderful experience which we will never forget.",
    location: "Netherlands",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Kamila Jeevanjee",
    designation: "Los Angeles, CA, USA – July, 2003",
    feedback:
      "What a wonderful trek- the care and attention of Hamid and all the porters made a very tough trip extremely pleasant, safe, and not so intimidating (especially the crossing of the Gondogoro La). The whole team is exceptionally wonderful and caring of every possible detail. The music in the evenings and the great food were an added bonus… Thank you so much Mountain Travels Pakistan.",
    location: "USA",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Georg Heel",
    designation: "Tyrol, Austria – August, 2001",
    feedback:
      "With an excellent crew, beginning with our guide Ibrahim, the cook Ali who cooked in this area like in a gourmet restaurant, and also special Mr. Mahdi, who watched over us day and night, it was an unforgettable experience. The specialty of the region, the loveliness of our porters…will stay in our minds. Thank you very much.",
    location: "Austria",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Peter Klocknu and Alte Franklurter",
    designation: "Hachenburg, Germany – June, 2001",
    feedback:
      "The trek to Concordia, Gondogoro La and Fairy Meadows was really great and perfectly organized by Mountain Travels Pakistan. We were deeply impressed not only by the spectacular scenery but also by the hospitality and helpfulness of the whole staff. MTP gave us the feeling to be at home in a foreign country.",
    location: "Germany",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Corrado Marino",
    designation: "Pavia, Italy – 2001 to 2008",
    feedback:
      "We have visited many times and Mr. Ghulam was not only a guide but had become a real friend and we hope to come again many times with him.",
    location: "Italy",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Galen Murton",
    designation: "Maine, USA – 2004",
    feedback:
      "Thank you very much to Ghulam Ahmed and everyone at Mountain Travels Pakistan for your excellent and professional services in arranging our trip to Concordia and the Baltoro, Biafo, and Hispar glaciers. Our guide, Mohammad Ali Raza, was fantastic and the crew he found for us was first class. I'd also like to acknowledge our tremendous appreciation of your accommodating our plans and itinerary while working on a limited budget.",
    location: "USA",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Erih Hegrelberg",
    designation: "Amsterdam, The Netherlands – 2004",
    feedback:
      "Our Baltoro/ Gondogoro La trek was super-organized and in a mountainous spirit flavoured with Balti flowers and apricots.",
    location: "Netherlands",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Rogier Noyan",
    designation: "Amsterdam, The Netherlands – 2004",
    feedback:
      "As a small organization Mountain Travels Pakistan understands both the mountains, the porters, the cook, etc., and the needs and wishes of us, the clients. Excellent. Hope to come and meet you again.",
    location: "Netherlands",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Abbey (US) & Edoardo (Italian)",
    designation: "Eldertreks' Silk Road – June, 2006",
    feedback:
      "Our Pakistan adventure has been more exciting than we had even expected…, the glorious scenery and the positive encounters with the locals…. Your country is wonderful…. We thank you, however, for everything else, and particularly for the kindness you have shown us personally…",
    location: "USA/Italy",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Ailen Farr",
    designation: "Eldertreks' Silk Road – May, 2006",
    feedback:
      "Words cannot express how I feel about Pakistan. The grandeur of the mountains, the lush valleys…",
    location: "USA",
    rating: 5,
    verified: true,
    isActive: true,
  },
  {
    name: "Eldertreks Guest",
    designation: "Eldertreks' Silk Road, 2006",
    feedback:
      "Your sense of humour and knowledge went a long way to making the journey and stay as enjoyable as it has been…",
    location: "Unknown",
    rating: 5,
    verified: true,
    isActive: true,
  },
];

// ─── Destinations seed data ───────────────────────────────────────────────────
const DESTINATIONS = [
  {
    slug: "hunza-valley",
    shortName: "Hunza Valley",
    name: "Hunza Valley – Jewel of the Karakoram",
    description:
      "Nestled amidst some of the world's highest mountains, Hunza Valley is one of Pakistan's most celebrated destinations. Renowned for its breathtaking scenery, hospitable communities, historic forts, and Silk Road heritage, Hunza offers visitors an unforgettable blend of culture and nature.",
    highlights: [
      "Baltit Fort",
      "Altit Fort",
      "Attabad Lake",
      "Passu Cones",
      "Hussaini Suspension Bridge",
      "Khunjerab National Park",
      "Khunjerab Pass",
    ],
    appeal:
      "Whether you are interested in photography, cultural exploration, trekking, or simply enjoying spectacular mountain scenery, Hunza Valley is an essential destination on any Pakistan itinerary.",
    suggestedTours: [
      "Hunza Valley Discovery",
      "Northern Pakistan Highlights",
      "Silk Route Explorer",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_hunza.webp",
    country: "Pakistan",
    region: "Gilgit-Baltistan",
    tours: 12,
    featured: true,
    tags: ["mountains", "silk-road", "culture", "trekking", "forts"],
  },
  {
    slug: "skardu-baltistan",
    shortName: "Skardu & Baltistan",
    name: "Skardu & Baltistan – Gateway to the World's Greatest Mountains",
    description:
      "Located in the heart of Baltistan, Skardu serves as the gateway to K2, Broad Peak, Gasherbrum, and many of the world's most famous mountain landscapes. The region is renowned for its dramatic scenery, crystal-clear lakes, ancient forts, and welcoming Balti culture.",
    highlights: [
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Lower Kachura Lake",
      "Satpara Lake",
      "Shigar Fort",
      "Khaplu Palace",
      "Deosai National Park",
      "Manthoka Waterfall",
    ],
    appeal:
      "Skardu is equally appealing to cultural travelers, nature enthusiasts, photographers, and mountaineers.",
    suggestedTours: [
      "Skardu & Baltistan Explorer",
      "Deosai Adventure",
      "K2 Base Camp Trek",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_skardu.webp",
    country: "Pakistan",
    region: "Gilgit-Baltistan",
    tours: 15,
    featured: true,
    tags: ["k2", "mountains", "lakes", "forts", "baltistan"],
  },
  {
    slug: "gilgit-baltistan",
    shortName: "Gilgit-Baltistan",
    name: "Gilgit-Baltistan – Land of Giants",
    description:
      "Gilgit-Baltistan is home to five of the world's fourteen peaks above 8,000 meters and some of the most spectacular mountain scenery anywhere on Earth. Travelers can experience dramatic landscapes while discovering centuries-old traditions and communities.",
    highlights: [
      "Towering 8,000m peaks",
      "Ancient Silk Road settlements",
      "Glaciers and alpine meadows",
      "Rich cultural diversity",
      "Historic trade routes",
    ],
    appeal:
      "Travelers can experience dramatic landscapes while discovering centuries-old traditions and communities that have thrived in these mountains for generations.",
    suggestedTours: [
      "Grand Northern Pakistan Tour",
      "Karakoram Highway Journey",
      "Silk Road Adventure",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_gilgit.webp",
    country: "Pakistan",
    region: "Gilgit-Baltistan",
    tours: 10,
    featured: true,
    tags: ["mountains", "8000m", "glaciers", "silk-road", "karakoram"],
  },
  {
    slug: "chitral-kalash",
    shortName: "Chitral & Kalash",
    name: "Chitral & Kalash Valleys – A Cultural Treasure",
    description:
      "The remote valleys of Chitral and Kalash provide one of the most unique cultural experiences in Asia. Surrounded by the rugged peaks of the Hindu Kush, the Kalash people have preserved distinctive traditions, festivals, and beliefs for centuries.",
    highlights: [
      "Bumburet Valley",
      "Rumbur Valley",
      "Birir Valley",
      "Chitral Town",
      "Chitral Fort",
      "Traditional Kalash Festivals",
    ],
    appeal:
      "Visitors gain fascinating insights into one of the region's most distinctive cultures while enjoying spectacular mountain scenery.",
    suggestedTours: [
      "Kalash Culture Tour",
      "Chitral Explorer",
      "Northern Cultural Journey",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_chitral.webp",
    country: "Pakistan",
    region: "Khyber Pakhtunkhwa",
    tours: 6,
    featured: false,
    tags: ["kalash", "culture", "festivals", "hindu-kush", "unique"],
  },
  {
    slug: "swat-valley",
    shortName: "Swat Valley",
    name: "Swat Valley – The Switzerland of Pakistan",
    description:
      "Known for its lush green valleys, alpine scenery, rivers, forests, and rich history, Swat Valley has long been one of Pakistan's most beloved travel destinations.",
    highlights: [
      "Mingora",
      "Malam Jabba",
      "Fizagat Park",
      "White Palace",
      "Buddhist Heritage Sites",
      "Kalam Valley",
      "Ushu Forest",
      "Mahodand Lake",
    ],
    appeal:
      "Swat combines natural beauty with cultural and historical significance, making it ideal for families, photographers, and nature lovers.",
    suggestedTours: [
      "Swat Valley Tour",
      "Family Adventure Pakistan",
      "Cultural Heritage Journey",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_swat.webp",
    country: "Pakistan",
    region: "Khyber Pakhtunkhwa",
    tours: 5,
    featured: false,
    tags: ["green-valleys", "buddhist", "alpine", "rivers", "forests"],
  },
  {
    slug: "kashmir",
    shortName: "Kashmir",
    name: "Kashmir – Paradise on Earth",
    description:
      "The breathtaking valleys of Azad Kashmir offer some of Pakistan's most picturesque landscapes, characterized by rolling hills, rivers, forests, and alpine meadows.",
    highlights: [
      "Neelum Valley",
      "Keran",
      "Arang Kel",
      "Sharda",
      "Ratti Gali Lake",
      "Pir Chinasi",
    ],
    appeal:
      "Kashmir is particularly attractive to travelers seeking scenic beauty, tranquility, and outdoor adventure.",
    suggestedTours: [
      "Kashmir Explorer",
      "Scenic Pakistan Journey",
      "Nature & Photography Tour",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_kashmir.webp",
    country: "Pakistan",
    region: "Azad Kashmir",
    tours: 4,
    featured: false,
    tags: ["paradise", "lakes", "alpine-meadows", "scenic", "neelum"],
  },
  {
    slug: "lahore",
    shortName: "Lahore",
    name: "Lahore – Cultural Capital of Pakistan",
    description:
      "Lahore is a vibrant city where history, culture, architecture, and cuisine come together to create an unforgettable travel experience.",
    highlights: [
      "Lahore Fort",
      "Badshahi Mosque",
      "Walled City",
      "Shalimar Gardens",
      "Lahore Museum",
      "Wagah Border Ceremony",
      "Traditional Food Streets",
    ],
    appeal:
      "The city's rich heritage and lively atmosphere make it one of South Asia's most fascinating cultural destinations.",
    suggestedTours: [
      "Heritage Pakistan Tour",
      "Grand Pakistan Tour",
      "Mughal Heritage Journey",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_lahore.webp",
    country: "Pakistan",
    region: "Punjab",
    tours: 8,
    featured: true,
    tags: ["mughal", "heritage", "food", "culture", "architecture"],
  },
  {
    slug: "taxila",
    shortName: "Taxila",
    name: "Taxila – Cradle of Gandhara Civilization",
    description:
      "A UNESCO World Heritage Site, Taxila is one of the most important archaeological destinations in Asia and a key center of Buddhist heritage.",
    highlights: [
      "Dharmarajika Stupa",
      "Jaulian Monastery",
      "Sirkap",
      "Taxila Museum",
      "Ancient Buddhist Sites",
    ],
    appeal:
      "Taxila provides unique insights into the Gandhara Civilization and the spread of Buddhism across Asia.",
    suggestedTours: [
      "Buddhist Heritage Tour",
      "Gandhara Civilization Tour",
      "Archaeological Pakistan",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_taxila.webp",
    country: "Pakistan",
    region: "Punjab",
    tours: 4,
    featured: false,
    tags: ["unesco", "buddhist", "gandhara", "archaeological", "heritage"],
  },
  {
    slug: "makran-coast",
    shortName: "Makran Coast",
    name: "Makran Coast – Pakistan's Hidden Coastal Wonder",
    description:
      "Stretching along the Arabian Sea, the Makran Coast offers dramatic landscapes, pristine beaches, fascinating geological formations, and a completely different side of Pakistan.",
    highlights: [
      "Hingol National Park",
      "Princess of Hope",
      "Kund Malir Beach",
      "Buzi Pass",
      "Mud Volcanoes",
      "Coastal Highway",
    ],
    appeal:
      "The region is ideal for adventurous travelers seeking off-the-beaten-path experiences.",
    suggestedTours: [
      "Makran Coastal Adventure",
      "Balochistan Explorer",
      "Photography Expedition",
    ],
    image: "http://localhost:5000/uploads/destinations/dest_makran.webp",
    country: "Pakistan",
    region: "Balochistan",
    tours: 3,
    featured: false,
    tags: ["coastal", "beach", "adventure", "balochistan", "national-park"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function log(msg) {
  console.log(`\n${"─".repeat(60)}\n${msg}`);
}
function ok(msg) {
  console.log(`  ✅ ${msg}`);
}
function warn(msg) {
  console.log(`  ⚠️  ${msg}`);
}
function err(msg) {
  console.error(`  ❌ ${msg}`);
}

// ─── Connect to a DB ──────────────────────────────────────────────────────────
async function connectTo(uri, label) {
  const conn = mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 15000,
  });
  await new Promise((resolve, reject) => {
    conn.once("open", resolve);
    conn.once("error", reject);
  });
  ok(`Connected to ${label}`);
  return conn;
}

// ─── Count docs in a collection ───────────────────────────────────────────────
async function countDocs(conn, colName) {
  try {
    const col = conn.db.collection(colName);
    return await col.countDocuments();
  } catch {
    return 0;
  }
}

// ─── Step 1: Check local DB status ───────────────────────────────────────────
async function checkLocalDB(localConn) {
  log("STEP 1: Checking Local DB status...");
  const toursCount = await countDocs(localConn, "tours");
  const destsCount = await countDocs(localConn, "destinations");
  const testCount = await countDocs(localConn, "testimonials");
  const usersCount = await countDocs(localConn, "users");
  console.log(`
  Collection        | Count
  ──────────────────|──────
  tours             | ${toursCount}
  destinations      | ${destsCount}
  testimonials      | ${testCount}
  users             | ${usersCount}
  `);
  return { toursCount, destsCount, testCount, usersCount };
}

// ─── Step 2: Seed local DB ────────────────────────────────────────────────────
async function seedLocalDB(localConn, counts) {
  log("STEP 2: Seeding missing data into Local DB...");

  // ── Destinations ──
  if (counts.destsCount === 0) {
    const col = localConn.db.collection("destinations");
    const now = new Date();
    const docs = DESTINATIONS.map((d) => ({
      ...d,
      createdAt: now,
      updatedAt: now,
    }));
    const res = await col.insertMany(docs);
    ok(`Seeded ${res.insertedCount} destinations`);
  } else {
    // Upsert each destination
    const col = localConn.db.collection("destinations");
    let upserted = 0;
    for (const d of DESTINATIONS) {
      const now = new Date();
      await col.updateOne(
        { slug: d.slug },
        { $set: { ...d, updatedAt: now }, $setOnInsert: { createdAt: now } },
        { upsert: true },
      );
      upserted++;
    }
    ok(`Upserted ${upserted} destinations (existing preserved)`);
  }

  // ── Testimonials ──
  if (counts.testCount === 0) {
    const col = localConn.db.collection("testimonials");
    const now = new Date();
    const docs = TESTIMONIALS.map((t) => ({
      ...t,
      createdAt: now,
      updatedAt: now,
    }));
    const res = await col.insertMany(docs);
    ok(`Seeded ${res.insertedCount} testimonials`);
  } else {
    ok(`Testimonials already exist (${counts.testCount}) - skipping seed`);
  }

  // ── Tours ──
  if (counts.toursCount === 0) {
    warn(
      "No tours found in local DB! Run: node src/scripts/seedToursFromContent.js to seed tours.",
    );
    warn(
      "Tours seeding is skipped here because the tour data is very large. Please seed separately.",
    );
  } else {
    ok(`Tours already exist (${counts.toursCount}) - skipping seed`);
  }
}

// ─── Step 3: Backup production DB ────────────────────────────────────────────
async function backupProdDB(prodConn) {
  log("STEP 3: Backing up production DB collections...");
  let totalBacked = 0;
  for (const colName of COLLECTIONS) {
    try {
      const col = prodConn.db.collection(colName);
      const docs = await col.find({}).toArray();
      if (docs.length > 0) {
        const filePath = path.join(BACKUP_DIR, `${colName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));
        ok(`Backed up ${docs.length} docs from '${colName}' → ${filePath}`);
        totalBacked += docs.length;
      } else {
        warn(`Collection '${colName}' is empty on production, skipping`);
      }
    } catch (e) {
      warn(`Could not backup '${colName}': ${e.message}`);
    }
  }
  ok(`Total backup: ${totalBacked} documents saved to ${BACKUP_DIR}`);
}

// ─── Step 4: Push local data to production ────────────────────────────────────
async function pushToProd(localConn, prodConn) {
  log("STEP 4: Pushing local data to production DB...");
  const syncCols = ["tours", "destinations", "testimonials"];

  for (const colName of syncCols) {
    const localCol = localConn.db.collection(colName);
    const prodCol = prodConn.db.collection(colName);

    const localDocs = await localCol.find({}).toArray();
    if (localDocs.length === 0) {
      warn(`Local '${colName}' is empty - skipping push`);
      continue;
    }

    const prodCount = await prodCol.countDocuments();
    ok(
      `Local '${colName}': ${localDocs.length} docs | Prod '${colName}': ${prodCount} docs`,
    );

    // For each local doc, upsert on production by _id
    let upserted = 0;
    let errors = 0;
    for (const doc of localDocs) {
      try {
        const { _id, ...rest } = doc;
        await prodCol.updateOne(
          { _id },
          {
            $set: { ...rest, updatedAt: new Date() },
            $setOnInsert: { _id, createdAt: doc.createdAt || new Date() },
          },
          { upsert: true },
        );
        upserted++;
      } catch (e) {
        errors++;
        // Ignore duplicate key errors silently
      }
    }
    ok(
      `'${colName}': ${upserted} upserted to production${errors > 0 ? `, ${errors} errors` : ""}`,
    );
  }
}

// ─── Step 5: Create admin user on production ──────────────────────────────────
async function createProdUser(prodConn) {
  log("STEP 5: Creating admin user on production DB...");
  const email = "info@mountaintravels.com";
  const password = "AdminMTP@110";
  const col = prodConn.db.collection("users");

  const existing = await col.findOne({ email });
  if (existing) {
    ok(`User '${email}' already exists on production`);
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    email,
    password: hashedPassword,
    firstName: "Mountain",
    lastName: "Travels",
    role: "admin",
    permissions: {
      tours: true,
      blogs: true,
      gallery: true,
      testimonials: true,
      partnerFeedbacks: true,
      inquiries: true,
      userManagement: true,
      systemSettings: true,
    },
    isActive: true,
    emailVerified: true,
    lastLogin: null,
    failedLoginAttempts: 0,
    lockedUntil: null,
    passwordResetToken: null,
    passwordResetExpires: null,
    emailVerificationToken: null,
    emailVerificationExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await col.insertOne(newUser);
  ok(`Admin user created on production:`);
  ok(`  Email: ${email}`);
  ok(`  Password: ${password}`);
}

// ─── Also create user on local DB ─────────────────────────────────────────────
async function createLocalUser(localConn) {
  log("Creating admin user on local DB (if not exists)...");
  const email = "info@mountaintravels.com";
  const password = "AdminMTP@110";
  const col = localConn.db.collection("users");

  const existing = await col.findOne({ email });
  if (existing) {
    ok(`User '${email}' already exists on local DB`);
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    email,
    password: hashedPassword,
    firstName: "Mountain",
    lastName: "Travels",
    role: "admin",
    permissions: {
      tours: true,
      blogs: true,
      gallery: true,
      testimonials: true,
      partnerFeedbacks: true,
      inquiries: true,
      userManagement: true,
      systemSettings: true,
    },
    isActive: true,
    emailVerified: true,
    lastLogin: null,
    failedLoginAttempts: 0,
    lockedUntil: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await col.insertOne(newUser);
  ok(`Admin user created on local DB: ${email}`);
}

// ─── Final verification ───────────────────────────────────────────────────────
async function verify(localConn, prodConn) {
  log("FINAL VERIFICATION:");
  for (const colName of ["tours", "destinations", "testimonials", "users"]) {
    const lCount = await countDocs(localConn, colName);
    const pCount = await countDocs(prodConn, colName);
    console.log(
      `  ${colName.padEnd(16)} | Local: ${String(lCount).padStart(4)} | Prod: ${String(pCount).padStart(4)}`,
    );
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚀 MOUNTAIN TRAVELS - MASTER SYNC SCRIPT");
  console.log("=".repeat(60));

  let localConn, prodConn;

  try {
    // Connect to both DBs
    log("Connecting to databases...");
    localConn = await connectTo(
      LOCAL_URI,
      "LOCAL DB (mongodb://localhost:27017/mtp)",
    );
    prodConn = await connectTo(PROD_URI, "PROD DB (147.93.94.137)");

    // Run all steps
    const counts = await checkLocalDB(localConn);
    await seedLocalDB(localConn, counts);
    await createLocalUser(localConn);
    await backupProdDB(prodConn);
    await pushToProd(localConn, prodConn);
    await createProdUser(prodConn);
    await verify(localConn, prodConn);

    log("✅ ALL DONE! Master sync completed successfully.");
  } catch (e) {
    err(`Fatal error: ${e.message}`);
    console.error(e);
  } finally {
    if (localConn) await localConn.close();
    if (prodConn) await prodConn.close();
    process.exit(0);
  }
}

main();
