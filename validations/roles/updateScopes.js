const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    scopeId: Joi.string().regex(/^[a-f\d]{24}$/i).required()
  }),
})
