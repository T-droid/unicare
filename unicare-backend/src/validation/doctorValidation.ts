import Joi from "joi";

// Validation for regNo (student registration number)
const regNoValidation = Joi.string()
  .required()
  .pattern(/^[A-Za-z]{2}\d{4}\/\d{3}$/)
  .messages({
    "string.empty": "Registration number is required",
    "string.pattern.base": "Invalid registration number format",
  });

// Validation for testName (lab test name)
const testNameValidation = Joi.string().required().max(100).messages({
  "string.empty": "Test name is required",
  "string.max": "Test name must not exceed 100 characters",
});

// Validation for testDescription (lab test description)
const testDescriptionValidation = Joi.string().required().max(200).messages({
  "string.empty": "Test description is required",
  "string.max": "Test description must not exceed 200 characters",
});

// Validation for requestedById (UUID of the staff requesting the test)
const requestedByIdValidation = Joi.string()
  .allow(null)
  .pattern(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  )
  .messages({
    "string.pattern.base": "Invalid UUID format",
  });

// Validation for prescription (medical prescription)
const prescriptionValidation = Joi.string().required().max(400).messages({
  "string.empty": "Prescription is required",
  "string.max": "Prescription must not exceed 400 characters",
});

// Validation for patientType (inpatient or outpatient)
const patientTypeValidation = Joi.string()
  .required()
  .valid("inpatient", "outpatient")
  .messages({
    "string.empty": "Patient type is required",
    "any.only": "Invalid patient type",
  });

// Schema for validating requestStudentLabTest inputs
export const validateRequestStudentLabTest = Joi.object({
  regNo: regNoValidation,
  testName: testNameValidation,
  testDescription: testDescriptionValidation,
  requestedById: requestedByIdValidation,
});

// Schema for validating createStudentPrescription inputs
export const validateCreateStudentPrescription = Joi.object({
  regNo: regNoValidation,
  prescription: prescriptionValidation,
});

// Schema for validating updatePatientType inputs
export const validateUpdatePatientType = Joi.object({
  regNo: regNoValidation,
  patientType: patientTypeValidation,
});
