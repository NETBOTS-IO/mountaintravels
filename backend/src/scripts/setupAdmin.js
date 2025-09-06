// backend/src/scripts/setupAdmin.js
import mongoose from "mongoose";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Readline interface for interactive mode
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) =>
  new Promise((resolve) => rl.question(prompt, resolve));

// Email & password validators
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

// Validate required environment variables
const validateEnvVars = () => {
  const required = [
    "MONGODB_URI",
    "DASHBOARD_ADMIN_EMAIL",
    "DASHBOARD_ADMIN_PASSWORD",
    "DASHBOARD_ADMIN_FIRST_NAME",
    "DASHBOARD_ADMIN_LAST_NAME",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      "Missing required environment variables:",
      missing.join(", ")
    );
    console.error("Make sure your .env file contains all required variables");
    return false;
  }

  return true;
};

// Get admin count
const getAdminCount = async () => {
  try {
    const count = await User.countDocuments();
    return count;
  } catch (error) {
    console.error("Error counting admins:", error.message);
    return 0;
  }
};

// Create admin user
const createAdminUser = async (interactive = false, isFirstAdmin = false) => {
  try {
    // Check if any admin already exists
    const existingAdminCount = await getAdminCount();
    
    if (existingAdminCount > 0 && !interactive && !isFirstAdmin) {
      console.log(`Admin(s) already exist in the system (${existingAdminCount} total)`);
      console.log("Use interactive mode (-i) to create additional admins");
      return;
    }

    let adminData = {
      email: process.env.DASHBOARD_ADMIN_EMAIL,
      password: process.env.DASHBOARD_ADMIN_PASSWORD,
      firstName: process.env.DASHBOARD_ADMIN_FIRST_NAME,
      lastName: process.env.DASHBOARD_ADMIN_LAST_NAME,
      role: "admin", // All users are admins
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
    };

    if (interactive) {
      console.log(existingAdminCount === 0 ? "\nCreate the first admin user" : "\nCreate a new admin user");
      console.log("Press Enter to use defaults in brackets.\n");

      const email = await question(`Email [${adminData.email}]: `);
      if (email.trim()) {
        if (!isValidEmail(email.trim()))
          throw new Error("Invalid email format");
        adminData.email = email.trim().toLowerCase();
      }

      const existingUser = await User.findOne({ email: adminData.email });
      if (existingUser)
        throw new Error(`User with email ${adminData.email} already exists`);

      const firstName = await question(`First Name [${adminData.firstName}]: `);
      if (firstName.trim()) adminData.firstName = firstName.trim();

      const lastName = await question(`Last Name [${adminData.lastName}]: `);
      if (lastName.trim()) adminData.lastName = lastName.trim();

      let password;
      while (true) {
        password = await question(`Password [${adminData.password}]: `);
        if (!password.trim()) password = adminData.password;

        if (isValidPassword(password)) {
          adminData.password = password;
          break;
        } else {
          console.log("\nPassword must contain:");
          console.log("- Minimum 8 characters");
          console.log(
            "- At least 1 uppercase, 1 lowercase, 1 number, 1 special char\n"
          );
        }
      }

      // Ask about permissions for non-first admin
      if (existingAdminCount > 0) {
        console.log("\nSet permissions for this admin:");
        const permissions = ['tours', 'blogs', 'gallery', 'testimonials', 'partnerFeedbacks', 'inquiries', 'userManagement', 'systemSettings'];
        
        for (const permission of permissions) {
          const defaultValue = adminData.permissions[permission] ? 'y' : 'n';
          const answer = await question(`${permission} [${defaultValue}]: `);
          adminData.permissions[permission] = answer.trim().toLowerCase() === 'n' ? false : true;
        }
      }
    } else {
      // Check if email already exists
      const existingUser = await User.findOne({ email: adminData.email });
      if (existingUser) {
        throw new Error(`User with email ${adminData.email} already exists`);
      }
    }

    const adminUser = new User(adminData);
    await adminUser.save();

    console.log("\nAdmin user created successfully!");
    console.log("Email:", adminUser.email);
    console.log("Name:", `${adminUser.firstName} ${adminUser.lastName}`);
    console.log("Permissions:", Object.entries(adminUser.permissions)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(', '));
    
    if (!interactive) {
      console.log("Password:", process.env.DASHBOARD_ADMIN_PASSWORD);
    }
    console.log("\nPlease change the password after first login.");
    
    if (existingAdminCount === 0) {
      console.log("\n🎉 This is the first admin user in the system!");
    }
  } catch (error) {
    if (error.code === 11000) {
      console.error("Error: Email already exists in database");
    } else {
      console.error("Error creating admin:", error.message);
    }
  }
};

// List all admin users
const listAdminUsers = async () => {
  try {
    const admins = await User.find({}).select(
      "email firstName lastName isActive permissions createdAt createdBy"
    ).populate('createdBy', 'firstName lastName email');

    if (!admins.length) {
      console.log("No admin users found.");
      return;
    }

    console.log(`\nFound ${admins.length} admin user(s):\n`);
    
    admins.forEach((admin, i) => {
      console.log(`${i + 1}. ${admin.firstName} ${admin.lastName}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Status: ${admin.isActive ? "Active" : "Inactive"}`);
      console.log(`   Created: ${admin.createdAt.toDateString()}`);
      
      if (admin.createdBy) {
        console.log(`   Created by: ${admin.createdBy.firstName} ${admin.createdBy.lastName} (${admin.createdBy.email})`);
      } else {
        console.log(`   Created by: System (Initial admin)`);
      }
      
      const enabledPermissions = Object.entries(admin.permissions)
        .filter(([key, value]) => value)
        .map(([key]) => key);
      
      console.log(`   Permissions: ${enabledPermissions.length > 0 ? enabledPermissions.join(', ') : 'None'}\n`);
    });
  } catch (error) {
    console.error("Error listing admin users:", error.message);
  }
};

// Update admin permissions
const updateAdminPermissions = async () => {
  try {
    const admins = await User.find({}).select("email firstName lastName permissions");
    
    if (!admins.length) {
      console.log("No admin users found.");
      return;
    }

    console.log("\nSelect admin to update permissions:\n");
    admins.forEach((admin, i) => {
      console.log(`${i + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
    });

    const choice = await question("\nEnter admin number: ");
    const adminIndex = parseInt(choice.trim()) - 1;

    if (adminIndex < 0 || adminIndex >= admins.length) {
      console.log("Invalid selection.");
      return;
    }

    const selectedAdmin = admins[adminIndex];
    console.log(`\nUpdating permissions for: ${selectedAdmin.firstName} ${selectedAdmin.lastName}`);
    
    const permissions = ['tours', 'blogs', 'gallery', 'testimonials', 'partnerFeedbacks', 'inquiries', 'userManagement', 'systemSettings'];
    const newPermissions = { ...selectedAdmin.permissions };
    
    for (const permission of permissions) {
      const currentValue = selectedAdmin.permissions[permission] ? 'y' : 'n';
      const answer = await question(`${permission} [${currentValue}]: `);
      if (answer.trim() !== '') {
        newPermissions[permission] = answer.trim().toLowerCase() !== 'n';
      }
    }

    await User.findByIdAndUpdate(selectedAdmin._id, { permissions: newPermissions });
    console.log("\nPermissions updated successfully!");
    
  } catch (error) {
    console.error("Error updating admin permissions:", error.message);
  }
};

// Menu for interactive mode
const showMenu = async () => {
  const adminCount = await getAdminCount();
  
  console.log("\nTourMaker Admin Setup");
  console.log(`Current admin count: ${adminCount}`);
  console.log("\n1. Create admin (interactive)");
  console.log("2. Create admin (from .env)");
  console.log("3. List all admins");
  console.log("4. Update admin permissions");
  console.log("5. Exit");

  const choice = await question("\nChoose option (1-5): ");
  switch (choice.trim()) {
    case "1":
      await createAdminUser(true, adminCount === 0);
      break;
    case "2":
      await createAdminUser(false, adminCount === 0);
      break;
    case "3":
      await listAdminUsers();
      break;
    case "4":
      await updateAdminPermissions();
      break;
    case "5":
      console.log("Exiting...");
      return false;
    default:
      console.log("Invalid choice.");
  }
  return true;
};

// Main function
const main = async () => {
  console.log("Starting setupAdmin script...");

  try {
    // Validate environment variables first
    if (!validateEnvVars()) {
      process.exit(1);
    }

    // Connect to database
    await connectDB();

    const isInteractive =
      process.argv.includes("--interactive") || process.argv.includes("-i");

    if (isInteractive) {
      let run = true;
      while (run) {
        run = await showMenu();
      }
    } else {
      const adminCount = await getAdminCount();
      await createAdminUser(false, adminCount === 0);
    }
  } catch (error) {
    console.error("Fatal error:", error.message);
    process.exit(1);
  } finally {
    // Cleanup
    if (rl) {
      rl.close();
    }
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(0);
  }
};

// Handle process termination gracefully
process.on("SIGINT", async () => {
  console.log("\nReceived SIGINT, cleaning up...");
  if (rl) rl.close();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nReceived SIGTERM, cleaning up...");
  if (rl) rl.close();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  process.exit(0);
});

// Run the main function
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});

export { createAdminUser, listAdminUsers, updateAdminPermissions };