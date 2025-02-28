import { Request, Response } from "express";
import { addDrug, getDrugs, administerDrug } from "../../services/drugService";
import { error } from "console";

export const createDrug = async (req: Request, res: Response) => {
  try {
    const { name, quantity } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ error: "name and quantity are required" });
    }
    const newDrug = await addDrug(name, quantity);
    res.status(201).json(newDrug);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const listDrugs = async (req: Request, res: Response) => {
  try {
    const { id, amount } = req.body;
    if (!id || !amount) {
      return res.status(400).json({ error: "Drug id and amount required" });
    }
    const updatedDrug = await administerDrug(id, amount);
    res.status(200).json(updatedDrug);
  } catch (error) {
    res.status(400).json({ error });
  }
};
