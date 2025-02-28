import Joi from "joi";

export const drugSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  quantity: Joi.number().integer().min(1).required(),
});
export const administerDrugSchema = Joi.object({
  id: Joi.string().uuid().required(),
  amount: Joi.number().integer().min(1).required(),
});
