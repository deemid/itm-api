var express = require('express')
var middleware = require('../middleware')
var router = express.Router()
const controllers = require('./controllers')

//ROUTES
router.post(
  '/queue',
  middleware.requiresUser,
  controllers.Transactions.postQueue
)
router.get('/queue', middleware.requiresUser, controllers.Transactions.getQueue)
router.get(
  '/confirmed',
  middleware.requiresUser,
  controllers.Transactions.confirmed
)
router.post(
  '/complete',
  middleware.requiresUser,
  controllers.Transactions.complete
)
router.get('/', middleware.requiresUser, controllers.Transactions.get)

module.exports = router
