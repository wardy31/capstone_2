const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "username is required",
    "string.empty": "username is required",
  }),
}).options({ allowUnknown: true });

module.exports = schema;
