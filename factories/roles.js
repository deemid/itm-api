require('module-alias/register')
const Factory = require('factory-lady')
const { Role } = require('@models')
const faker = require('faker')

module.exports = Factory.define('role', Role, {
  name: faker.name.jobTitle(),
  slug: faker.name.jobTitle().toUpperCase(),
})
