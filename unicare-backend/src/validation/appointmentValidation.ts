import Joi from "joi"

export const appointmentSchema = Joi.object({
    studentId: Joi.string().required(),
    doctorId: Joi.string().required(),
    date: Joi.string().isoDate().required(),
    time: Joi.string().required(),
  });