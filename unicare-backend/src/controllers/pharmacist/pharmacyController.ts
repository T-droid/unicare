import { Request, Response } from "express";
import { addDrug, getDrugs, administerDrug } from "../../services/drugService";

export const createDrug = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { role } = req.user || {};
  if (!role && role !== "pharmacist") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { name, quantity } = req.body;
    const newDrug = await addDrug(name, quantity);
    res.status(201).json(newDrug);
  } catch (error: any) {
    res.status(500).json({ error: `${error}` });
  }
};

export const listDrugs = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { role } = req.user || {};
  if (!role && role !== "pharmacist") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const drugs = await getDrugs();
    res.status(200).json(drugs);
  } catch (error: any) {
    res.status(500).json({ error: `${error}` });
  }
};

export const handleAdministerDrug = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { role } = req.user || {};
  if (!role && role !== "pharmacist") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const { name, amount } = req.body;
    const updatedDrug = await administerDrug(name, amount);
    res.status(200).json(updatedDrug);
  } catch (error: any) {
    res.status(400).json({ message: `${error}` });
  }
};
