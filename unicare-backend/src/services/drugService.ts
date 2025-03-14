import { db } from "../db";
import { DrugsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const addDrug = async (name: string, quantity: number) => {
  return await db.insert(DrugsTable).values({ name, quantity }).returning;
};
export const getDrugs = async () => {
  return await db.select().from(DrugsTable);
};
export const administerDrug = async (id: string, amount: number) => {
  const drug = await db
    .select()
    .from(DrugsTable)
    .where(eq(DrugsTable.id, id))
    .then((res) => res[0]);

  if (!drug) throw new Error("Drug not found");
  if (drug.quantity < amount) throw new Error("Not enough stock");

  return await db
    .update(DrugsTable)
    .set({ quantity: drug.quantity - amount })
    .where(eq(DrugsTable.id, id))
    .returning();
};
