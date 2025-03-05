import Joi from "joi";

export const appointmentSchema = Joi.object({
  regNo: Joi.string().required(),
  doctorId: Joi.string().required(),
  date: Joi.string().isoDate().required(),
});
