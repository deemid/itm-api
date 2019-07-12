const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserGatewaySchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  userId: {
    type: string,
    required: true,
  },
  cachingStrategy: {
    type: String,
    enum: ['aggressive', 'regular', 'low'],
  },
})

module.exports = mongoose.model('UserGateway', UserGatewaySchema)
