import { seedAdminUser } from "./admin.seeder";
import { seedStudents } from "./user.seeders";
const seedDatabase = async () => {
  try {
    console.log("🚀 Starting database seeding...");
    // seeders here
    await seedAdminUser();
    // await seedStudents();
    process.exit(0);

    console.log("✅ Database seeding complete!");
  } catch (error) {
    console.error("❌ Error while seeding:", error);
  }
};

// Run the seed function
seedDatabase();
