const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().optional(),
    slug: Joi.string().optional(),
    managerRoleId: Joi.string()
      .regex(/^[a-f\d]{24}$/i)
      .optional()
      .allow(null),
    description: Joi.string()
      .optional()
      .allow(null),
    isActive: Joi.bool().optional(),
  }),
})
