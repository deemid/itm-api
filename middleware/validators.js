const validator = require('validator')
const { body } = require('express-validator/check')

const requestApiValidators = [
  body('name').custom(val => {
    if (!validator.isAlpha(validator.blacklist(val.trim(), ' '))) {
      throw new Error('Invalid Name')
    } else {
      return true
    }
  }),
  body('email').custom((val, { req }) => {
    if (validator.isEmail(unescape(val))) {
      return true
    } else {
      throw new Error('Invalid Email')
    }
  }),
  body('phoneNumber').custom(val => {
    if (!validator.isAlphanumeric(validator.blacklist(val.trim(), ' '))) {
      throw new Error('Invalid Phone Number')
    } else {
      return true
    }
  }),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be 8 letters or more')
    .matches(/.*[a-z]/)
    .withMessage('Password must have at least one lowercase character')
    .matches(/.*[A-Z]/)
    .withMessage('Password must have at least one uppercase character')
    .matches(/.*\d/)
    .withMessage('Password must have at least one numeric character')
    .matches(/.*[!@#$%^&*()_+\-={}:|";'/.,<>?`~]/)
    .withMessage('Password must have at least one non-alphanumeric character'),
]

module.exports = {
  requestApiValidators,
}
