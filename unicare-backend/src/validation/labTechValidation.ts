import Joi from "joi";

// Validation for regNo (student registration number)
const regNoValidation = Joi.string()
  .required()
  .pattern(/^[A-Za-z]{2}\d{4}\/\d{3}$/) // Example: CS2020/007
  .messages({
    "string.empty": "Registration number is required",
    "string.pattern.base":
      "Invalid registration number format. Example: CS2020/007",
  });

// Validation for labResults as a string
export const validateCreateLabResults = Joi.object({
  regNo: regNoValidation,
  labResult: Joi.string().required().messages({
    "string.empty": "Lab results are required",
  }),
});
