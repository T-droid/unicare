import Joi from "joi";

// ensuring we get data that is clean
export const registerSchema = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string(),
});
