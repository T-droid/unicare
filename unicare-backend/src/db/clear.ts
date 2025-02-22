import { db } from ".";
import { sql } from "drizzle-orm";

const clearDatabase = async () => {
  try {
    console.log("⚠️ Dropping all tables...");
    await db.execute(sql`DROP SCHEMA public CASCADE;`);
    await db.execute(sql`CREATE SCHEMA public;`);
    console.log("✅ Database cleared!");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

// Run the clear function
clearDatabase();
