import Joi from "joi";

export const createDeptSchema = Joi.object({
  name: Joi.string().max(30).required(),
});