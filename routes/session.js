const controllers = require('./controllers')
const router = require('express').Router()
const middleware = require('../middleware')

router.get('/', middleware.getLoginDescriptions, controllers.Session.get)

module.exports = router
