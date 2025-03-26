import Joi from "joi";

export const appointmentSchema = Joi.object({
  regNo: Joi.string().required(),
  doctorId: Joi.string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required(),
  date: Joi.string()
    .isoDate()
    .custom((value, helpers) => {
      if (isNaN(Date.parse(value))) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
});
