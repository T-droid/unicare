import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js/driver";
import postgres from "postgres";
import { dbConfig } from "../config/config";

const connectionString = dbConfig.databaseUrl as string;
if (!connectionString) {
  throw new Error("DATABASE_URI not set");
}

const migrationClient = postgres(connectionString);
const db = drizzle(migrationClient);

const main = async (): Promise<void> => {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  await migrationClient.end();
  console.log("Datbase migrated successfully...");
};

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
