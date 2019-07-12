require('module-alias/register')
const bcrypt = require('bcrypt')
const Factory = require('factory-lady')
const hat = require('hat')
const rack = hat.rack()
const { OAuthClientsModel } = require('@models')
const faker = require('faker')

module.exports = Factory.define('oauth-clients', OAuthClientsModel, {
  clientId: hat(),
  clientSecret: rack(),
  redirectUri: faker.internet.url(),
})
