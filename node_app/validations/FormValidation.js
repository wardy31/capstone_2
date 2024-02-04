const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Question is required",
    "string.empty": "Question is required",
  }),
}).unknown(true);

module.exports = schema;
