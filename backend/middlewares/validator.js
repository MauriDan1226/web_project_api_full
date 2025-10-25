const validator = require('validator');
const { Joi, celebrate, Segments } = require('celebrate');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const userValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().optional().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });

  const loginValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
  
  
  module.exports = {
    validateURL,
    userValidation,
    loginValidation,
  };