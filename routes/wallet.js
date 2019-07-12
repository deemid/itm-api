const controllers = require('./controllers')
const express = require('express')
const middleware = require('../middleware')
const router = express.Router()

router.post('/seed', controllers.Wallets.seed)

router.post('/addresses/get/:index', controllers.Wallets.addressesGetIndex)

router.post('/addresses/list', controllers.Wallets.addressesList)

router.post('/qrcode', controllers.Wallets.qrcode)

router.post('/store', middleware.requiresUser, controllers.Wallets.store)

router.delete('/', middleware.requiresUser, controllers.Wallets.delete)

router.get('/', middleware.requiresUser, controllers.Wallets.get)

module.exports = router
