const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "disease name is required",
  }),
});

module.exports = schema;
