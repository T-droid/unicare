import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js/driver";
import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URI as string;
if (!connectionString) {
  throw new Error("DATABASE_URI not set");
}

const migrationClient = postgres(connectionString);
const db = drizzle(migrationClient);

const main = async (): Promise<void> => {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: "./src/config/drizzle/migrations" });
  await migrationClient.end();
  console.log("Datbase migrated successfully...");
};

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
