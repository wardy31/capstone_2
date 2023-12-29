const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().required().messages({
    'any.required':"Username is required"
  }),
  password: Joi.string().required().messages({
    'any.required':"Password is required"
  }),
});

module.exports = schema;
