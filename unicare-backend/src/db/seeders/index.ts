import { seedAdminUser } from "./admin.seeder";
const seedDatabase = async () => {
  try {
    console.log("🚀 Starting database seeding...");
    // seeders here
    await seedAdminUser();

    console.log("✅ Database seeding complete!");
  } catch (error) {
    console.error("❌ Error while seeding:", error);
  }
};

// Run the seed function
seedDatabase();
