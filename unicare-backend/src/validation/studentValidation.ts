import Joi from "joi";

export const registerStudentSchema = Joi.object({
  name: Joi.string().min(2).max(200).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters long.",
    "any.required": "Name is required.",
  }),
  phone_number: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10-15 digits long.",
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
    }),
  reg_no: Joi.string().alphanum().min(5).max(15).required().messages({
    "string.empty": "Registration number is required.",
    "string.min": "Registration number must be at least 5 characters long.",
    "any.required": "Registration number is required.",
  }),
  emergency_contact: Joi.string()
    .pattern(/^\d{10,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Emergency contact must be 10-15 digits long.",
    }),
  special_conditions: Joi.string().optional(),
});
