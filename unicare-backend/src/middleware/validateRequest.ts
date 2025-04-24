import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
      next();
    } else {
      const errors = error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
      }));

      res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
  };
};

export default validateRequest;
