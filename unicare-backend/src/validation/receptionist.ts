import Joi from "joi";

export const receptionistSchema = Joi.object({
  regNo: Joi.string().required(),
});
