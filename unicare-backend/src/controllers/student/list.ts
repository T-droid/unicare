import { Request, Response } from "express";
import { getStudents } from "../../services/studentService";
import {
  getPaginationMetadata,
  getPaginationParams,
} from "../../util/pagination";

export const listStudents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { page, limit, offset } = getPaginationParams(req.query);

    if (page && limit) {
      const { students, total } = await getStudents(req.query, offset, limit);

      res.json({
        data: students,
        pagination: getPaginationMetadata(total, page, limit),
      });
      return;
    }
    const { students } = await getStudents(req.query);
    res.json({
      data: students,
      pagination: null,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);

      res.status(400).json({ error: error });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
