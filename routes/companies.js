const controllers = require('./controllers')
const express = require('express')
const middleware = require('../middleware')
const validations = require('@validations')
const router = express.Router()

router.param('id', controllers.Companies.paramId)

router.post(
  '/',
  validations.Companies.create,
  validations.Companies.alreadyExists,
  middleware.requiresUser,
  controllers.Companies.create
)

router
  .route('/:id')
  .put(
    middleware.requiresUser,
    validations.Companies.update,
    controllers.Companies.update
  )

router.route('/:id')
  .get(
    middleware.requiresUser,
    controllers.Companies.getById
  )

router.get('/', middleware.requiresUser, controllers.Companies.get)

module.exports = router
