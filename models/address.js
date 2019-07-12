const mongoose = require('mongoose')
require('mongoose-type-url')

const AddressSchema = require('../schemas/address')

module.exports = mongoose.model('Address', AddressSchema)
