require('module-alias/register')
const Factory = require('factory-lady')
const { Scope } = require('@models')
const faker = require('faker')

let methods = ['POST', 'GET', 'PUT', 'DELETE']
let randomIndex = Math.floor( Math.random() * methods.length )

module.exports = Factory.define('scope', Scope, {
  slug: faker.random.word(),
  path: '/' + faker.random.word(),
  method: methods[randomIndex]
})
