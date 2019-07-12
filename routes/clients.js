var middleware = require('../middleware')
var router = require('express').Router()

const controllers = require('./controllers')

router.post('/', middleware.requiresUser, controllers.Clients.create)

module.exports = router
