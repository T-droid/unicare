import { Request, Response } from "express";
import { addDrug, getDrugs, administerDrug } from "../../services/drugService";


export const createDrug = async (req: Request, res: Response) => {
    try {
        const { name, quantity } = req.body;
        const newDrug = await addDrug(name, quantity);
        res.status(201).json(newDrug);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const listDrugs = async (req: Request, res: Response) => {
    try {
        const drugs = await getDrugs();
        res.status(200).json(drugs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const handleAdministerDrug = async (req: Request, res: Response) => {
    try {
        const { id, amount } = req.body;
        const updatedDrug = await administerDrug(id, amount);
        res.status(200).json(updatedDrug);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};