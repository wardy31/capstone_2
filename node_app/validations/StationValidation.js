const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "username is required",
    "string.empty": "username is required",
  }),
  // username: Joi.string().required().messages({
  //   "any.required": "username is required",
  // }),
  password: Joi.string().required().messages({
    "any.required": "password is required",
    "string.empty": "password is required",
  }),
}).options({ allowUnknown: true });

module.exports = schema;
