const router = require('express').Router()
var middleware = require('../middleware')
const controllers = require('./controllers')
const validations = require('@validations')

//ROUTES
router.param('id', controllers.Scopes.paramId)

router
  .route('/')
  .post(
    middleware.requiresUser,
    validations.Scopes.create,
    controllers.Scopes.create
  )
  .get(middleware.requiresUser, controllers.Scopes.get)

router
  .route('/:id')
  .get(middleware.requiresUser, controllers.Scopes.getById)
  .put(
    middleware.requiresUser,
    validations.Scopes.update,
    controllers.Scopes.update
  )
  .delete(middleware.requiresUser, controllers.Scopes.delete)

module.exports = router
