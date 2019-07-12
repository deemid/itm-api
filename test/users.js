const assert = require('chai').assert
const request = require('supertest')
const faker = require('faker')
const mongoose = require('mongoose')

describe('UsersController', () => {
  describe('#create', () => {
    const app = require('../app')
    it('should create a user', done => {
      request(app)
        .post('/users')
        .send({
          email: faker.internet.email(),
          password: 'Testpassword01!',
          name: faker.name.findName(),
        })
        .set('Accept', 'application/json')
        .expect(201)
        .then(response => {
          assert.equal(response.body.success, true, 'Should be true')
          done()
        })
    }).timeout(10000)

    it('should fail creating a user when invalid email has been passed', done => {
      request(app)
        .post('/users')
        .send({
          email: 'blahblah@',
          password: faker.internet.password(),
          name: faker.name.findName(),
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then(response => {
          assert.isTrue(
            response.body.validation.keys.includes('email'),
            'Should have errors for email'
          )
          done()
        })
    }).timeout(10000)

    it('should fail creating a user when invalid email has been passed', done => {
      request(app)
        .post('/users')
        .send({
          email: 'blahblah@',
          password: 'Testpassword01!',
          name: faker.name.findName(),
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then(response => {
          assert.isTrue(
            response.body.validation.keys.includes('email'),
            'Should have errors for email'
          )
          done()
        })
    }).timeout(10000)

    it('should fail creating a user when user has forgotten their password', done => {
      request(app)
        .post('/users')
        .send({
          email: faker.internet.email(),
          name: faker.name.findName(),
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then(response => {
          assert.isTrue(
            response.body.validation.keys.includes('password'),
            'Should have errors for password'
          )
          done()
        })
    }).timeout(10000)

    after(done => {
      mongoose.connection.dropDatabase().then(() => {
        done()
      })
    })
  })
})
