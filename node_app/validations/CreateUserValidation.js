const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "first name is required",
    "string.empty": "first name is required",
  }),
  middleName: Joi.string().required().messages({
    "any.required": "middle name is required",
    "string.empty": "middle name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "last name is required",
    "string.empty": "last name is required",
  }),
  gender: Joi.string().required().messages({
    "any.required": "gender is required",
    "string.empty": "gender is required",
  }),
  role: Joi.string().required().messages({
    "any.required": "role is required",
    "string.empty": "role is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "address is required",
    "string.empty": "address is required",
  }),
  vaccineStatus: Joi.string().required().messages({
    "any.required": "vaccine is required",
    "string.empty": "vaccine is required",
  }),
  contactNumber: Joi.string().length(11).required().messages({
    "any.required": "role is required",
    "string.empty": "role is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "role is required",
    "string.empty": "role is required",
  }),
  username: Joi.string().required().messages({
    "any.required": "username is required",
    "string.empty": "username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "password is required",
    "string.empty": "password is required",
  }),
  upload1: Joi.array().messages({
    "array.base": "Face Image 1 is required",
    "string.empty": "Face Image 1 is required",
  }),
  upload2: Joi.array().messages({
    "array.base": "Face Image 2 is required",
    "string.empty": "Face Image 2 is required",
  }),
}).unknown(true);

module.exports = schema;
