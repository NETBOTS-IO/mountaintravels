/**
 * FORCE RE-SYNC SCRIPT  –  backend/scripts/forceReSync.js
 * =======================================================
 * ⚠️  WARNING: This script will WIPE (delete) the target collections on PRODUCTION
 *              and copy clean data from Local DB.
 *
 * Wipe list: tours, destinations, testimonials
 * User preservation: Admin user (info@mountaintravels.com) will be recreated/ensured.
 *
 * Run: node scripts/forceReSync.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || process.env.MONGODB_URI;
const PROD_URI = process.env.PROD_MONGODB_URI;
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

const TARGET_COLLECTIONS = ["tours", "destinations", "testimonials", "blogs"];

function assertEnv() {
  if (!LOCAL_URI || !PROD_URI) {
    console.error("❌ Missing LOCAL_MONGODB_URI or PROD_MONGODB_URI in .env");
    process.exit(1);
  }
}

async function connectTo(uri, label) {
  const conn = mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 12000,
    connectTimeoutMS: 15000,
  });
  await new Promise((resolve, reject) => {
    conn.once("open", resolve);
    conn.once("error", reject);
  });
  console.log(`✅ Connected to ${label}`);
  return conn;
}

async function run() {
  assertEnv();
  let localConn, prodConn;

  try {
    localConn = await connectTo(LOCAL_URI, "LOCAL DB");
    prodConn = await connectTo(PROD_URI, "PROD DB");

    console.log("\n🧹 STEP 1: Deleting target collections on PRODUCTION...");
    for (const colName of TARGET_COLLECTIONS) {
      const prodCol = prodConn.db.collection(colName);
      const count = await prodCol.countDocuments();
      console.log(
        `   - Wiping '${colName}' on Prod (current count: ${count})...`,
      );
      await prodCol.deleteMany({});
      console.log(`     Wiped '${colName}' successfully.`);
    }

    console.log("\n🚀 STEP 2: Copying data from LOCAL to PRODUCTION...");
    for (const colName of TARGET_COLLECTIONS) {
      const localCol = localConn.db.collection(colName);
      const prodCol = prodConn.db.collection(colName);

      const localDocs = await localCol.find({}).toArray();
      if (localDocs.length === 0) {
        console.log(`   - '${colName}' is empty locally. Skipping copy.`);
        continue;
      }

      console.log(
        `   - Copying ${localDocs.length} documents for '${colName}'...`,
      );
      await prodCol.insertMany(localDocs);
      console.log(`     Copy complete for '${colName}'.`);
    }

    console.log("\n👤 STEP 3: Ensuring Admin User exists on Production...");
    const email = "info@mountaintravels.com";
    const password = "AdminMTP@110";
    const userCol = prodConn.db.collection("users");

    // Remove existing info@mountaintravels.com to prevent duplicates or clean credentials
    await userCol.deleteMany({ email });

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userCol.insertOne({
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(
      `   - Created fresh admin user info@mountaintravels.com on Prod.`,
    );

    console.log("\n📊 FINAL VERIFICATION:");
    for (const colName of [...TARGET_COLLECTIONS, "users"]) {
      const lCount = await localConn.db.collection(colName).countDocuments();
      const pCount = await prodConn.db.collection(colName).countDocuments();
      console.log(
        `   ${colName.padEnd(15)} | Local: ${String(lCount).padStart(3)} | Prod: ${String(pCount).padStart(3)}`,
      );
    }

    console.log("\n✨ FORCE RE-SYNC COMPLETED SUCCESSFULY!");
  } catch (e) {
    console.error("❌ Fatal Error during re-sync:", e.message);
  } finally {
    if (localConn) await localConn.close();
    if (prodConn) await prodConn.close();
    process.exit(0);
  }
}

run();
