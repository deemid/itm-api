require('module-alias/register')
const bcrypt = require('bcrypt')
const Factory = require('factory-lady')
const { User } = require('@models')
const faker = require('faker')

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}
var emailCounter = 1;
module.exports = Factory.define('user', User, {
  email: function(cb) { cb('user' + emailCounter++ + '@example.com'); },
  hashed_password: hashPassword('testpassword'),
  name: (cb) => cb(faker.name.findName()),
})
