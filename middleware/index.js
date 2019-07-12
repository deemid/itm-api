const { validationResult } = require('express-validator/check')

const transporter = require('./transporter')

const authMiddleware = require('./auth')

module.exports = {
  requiresUser: authMiddleware.requiresUser,
  loadUser: authMiddleware.loadUser,
  isValidationError: authMiddleware.isValidationError,
  notFoundHandler: authMiddleware.notFoundHandler,
  getLoginDescriptions: authMiddleware.getLoginDescriptions,
  transporter
}
