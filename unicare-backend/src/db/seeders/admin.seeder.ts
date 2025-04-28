// seed admin user

import { db } from "../index";
import { UserTable } from "../schema";

import { eq } from "drizzle-orm";
import { hashPassword } from "../../util/password";

export const seedAdminUser = async () => {
  const hashedPassword = await hashPassword("admin123");
  const email = "admin@example.com";
  const phone_number = "1234567890";
  const work_id = "admin123";
  const name = "Admin User";
  const role = "admin";

  try {
    // Check if the admin user already exists
    const existingUser = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    if (existingUser.length > 0) {
      console.log("Admin user already exists. Skipping seed.");
      return;
    }

    // Seed the admin user
    const user = await db
      .insert(UserTable)
      .values({
        email,
        password: hashedPassword,
        phone_number,
        work_id,
        name,
        role,
        department_id: "e6df73a8-dcf6-402e-bce0-0961c5c12a3c",
      })
      .returning();
    console.log("Admin user seeded:", user);
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
