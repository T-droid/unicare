import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL as string;
export default defineConfig({
  out: "./src/db/migrations",
  dialect: "postgresql",
  schema: "./src/db/schema.ts",

  driver: "pglite",
  dbCredentials: {
    url: dbUrl,
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "./src/db/schema.ts",
  },

  entities: {
    roles: {
      provider: "",
      exclude: [],
      include: [],
    },
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
