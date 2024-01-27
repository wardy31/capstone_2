const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "username is required",
    "any.required": "username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
  }),
});

module.exports = schema;
