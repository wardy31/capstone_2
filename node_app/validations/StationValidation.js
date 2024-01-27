const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "disease name is required",
  }),
  // username: Joi.string().required().messages({
  //   "any.required": "username is required",
  // }),
  // password: Joi.string().required().messages({
  //   "any.required": "password is required",
  // }),
}).options({ allowUnknown: true });

module.exports = schema;
