const { celebrate, Joi, errors } = require('celebrate')
module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    companyName: Joi.string().required(),
    name: Joi.string().required(),
    roleId: Joi.string().required(),
  }),
})
