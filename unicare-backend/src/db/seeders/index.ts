const seedDatabase = async () => {
  try {
    console.log("🚀 Starting database seeding...");
    // seeders here

    console.log("✅ Database seeding complete!");
  } catch (error) {
    console.error("❌ Error while seeding:", error);
  }
};

// Run the seed function
seedDatabase();
