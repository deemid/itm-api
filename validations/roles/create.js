const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    managerRoleId: Joi.string()
      .regex(/^[a-f\d]{24}$/i)
      .optional()
      .allow(null),
    description: Joi.string()
      .optional()
      .allow(null),
    isActive: Joi.bool()
      .optional()
      .default(true),
    scopes: Joi.alternatives(
      Joi.string().regex(/^[a-f\d]{24}$/i),
      Joi.array().items(Joi.string().regex(/^[a-f\d]{24}$/i))
    )
      .optional()
      .default([]),
  }),
})
