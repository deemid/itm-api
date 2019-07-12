const router = require('express').Router()
var middleware = require('../middleware')
const controllers = require('./controllers')
const validations = require('@validations')

//ROUTES
router.param('id', controllers.Roles.paramId)

router
  .route('/')
  .post(
    middleware.requiresUser,
    validations.Roles.create,
    controllers.Roles.create
  )
  .get(middleware.requiresUser, controllers.Roles.get)

router
  .route('/:id')
  .get(middleware.requiresUser, controllers.Roles.getById)
  .put(
    middleware.requiresUser,
    validations.Roles.update,
    controllers.Roles.update
  )
  .delete(middleware.requiresUser, controllers.Roles.delete)

router.post('/:id/scopes', 
  middleware.requiresUser,
  validations.Roles.updateScopes,
  controllers.Roles.addScope
)

router.delete('/:id/scopes/:scopeId',
  middleware.requiresUser,
  controllers.Roles.removeScope
)

module.exports = router
