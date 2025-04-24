import { db } from "../db";
import { DrugsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const addDrug = async (name: string, quantity: number) => {
  try {
    // Check if the drug already exists
    const lowerCaseName = name.toLowerCase();
    const existingDrug = await db
      .select()
      .from(DrugsTable)
      .where(eq(DrugsTable.name, lowerCaseName))
      .limit(1);
    if (existingDrug.length > 0) {
      // If it exists, update the quantity
      const updatedDrug = await db
        .update(DrugsTable)
        .set({ quantity: existingDrug[0].quantity + quantity })
        .where(eq(DrugsTable.name, lowerCaseName))
        .returning();
      return updatedDrug;
    } else {
      return await db
        .insert(DrugsTable)
        .values({
          name: lowerCaseName,
          quantity,
        })
        .returning();
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getDrugs = async () => {
  return await db
    .select({
      id: DrugsTable.id,
      name: DrugsTable.name,
      quantity: DrugsTable.quantity,
    })
    .from(DrugsTable);
};
export const administerDrug = async (name: string, amount: number) => {
  try {
    const lowerCaseName = name.toLowerCase();
    const drugExists = await db
      .select()
      .from(DrugsTable)
      .where(eq(DrugsTable.name, lowerCaseName))
      .limit(1);
    if (!drugExists) throw new Error("Drug not found");

    if (drugExists[0].quantity !== 0 && drugExists[0].quantity < amount){
      // If the quantity is less than the amount to be administered give the available quantity
      amount = drugExists[0].quantity;
    } else if (drugExists[0].quantity === 0) {
      throw new Error("Drug out of stock");
    }

    const drug = await db
      .update(DrugsTable)
      .set({ quantity: drugExists[0].quantity - amount })
      .where(eq(DrugsTable.name, lowerCaseName))
      .returning();

    return drug;
  } catch (error: any) {
    console.error("Error administering drug:", error);
    throw new Error(error);
  }
};
