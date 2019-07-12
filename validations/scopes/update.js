const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    path: Joi.string().optional(),
    method: Joi.string().optional(),
    slug: Joi.string().optional(),
  }),
})
