const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    path: Joi.string().required(),
    method: Joi.string().required(),
    slug: Joi.string().required(),
  }),
})