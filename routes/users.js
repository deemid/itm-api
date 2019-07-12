const controllers = require('./controllers')
const router = require('express').Router()
const validations = require('@validations')

router.post('/', validations.Users.create, controllers.Users.create)

module.exports = router
