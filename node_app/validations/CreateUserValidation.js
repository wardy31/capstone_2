const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "first name is required",
  }),
  middleName: Joi.string().required().messages({
    "any.required": "middle name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "last name is required",
  }),
  gender: Joi.string().required().messages({
    "any.required": "gender is required",
  }),
  role: Joi.string().required().messages({
    "any.required": "role is required",
  }),
  address: Joi.string().required().messages({
    "any.required": "address is required",
  }),
  vaccineStatus: Joi.string().required().messages({
    "any.required": "vaccine is required",
  }),
  contactNumber: Joi.string().length(11).required().messages({
    "any.required": "role is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "role is required",
  }),
  username: Joi.string().required().messages({
    "any.required": "username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "password is required",
  }),
}).unknown(true);

module.exports = schema;
