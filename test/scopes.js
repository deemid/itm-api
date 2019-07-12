const assert = require('chai').assert
const request = require('supertest')
const faker = require('faker')
const app = require('../app')
const { Scope } = require('../models')
const setupPartners = require('./setup-partners')

require('../factories')
const Factory = require('factory-lady')

describe('ScopesController', () => {
  let token
  let methods = ['POST', 'GET', 'PUT', 'DELETE']

  before(function(done) {
    this.timeout(10000)
    setupPartners(() => {
      Factory.create('user', user => {
        request(app)
          .post('/oauth/token')
          .send({
            username: user.email,
            password: 'testpassword',
            grant_type: 'password',
            client_id: 'partners',
            client_secret: 'secret',
          })
          .set('Accept', 'application/json')
          .set(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8'
          )
          .then(response => {
            token = response.body.access_token
            done()
          })
      })
    })
  })

  describe('#create', () => {
    let createScope = (data, done) => {
      request(app)
        .post('/scopes')
        .send(data)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(400, done)
    }

    it('should create a scope', function(done) {
      let randomIndex = Math.floor( Math.random() * methods.length )
      let data = {
        slug: faker.random.word(),
        path: '/' + faker.random.word(),
        method: methods[randomIndex]
      }
      
      request(app)
        .post('/scopes')
        .send(data)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .then(response => {
          Scope.findById(response.body._id).then(res => {
            done()
          }).catch(err => {
            done(err)
          })
        })
        .catch(err => {
          done(err)
        })
    }).timeout(10000)
    
    it('should return 400 when invalid data is passed', done => {
      createScope(
        {
          slug: 'slug',
          method: 'POST',
          path: '/route',
          INVALIDKEY: 'data',
        },
        done
      )
    })

  })

  describe('#get', () => {
    it('should return an array of scopes', done => {
      request(app)
        .get('/scopes')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, response) => {
          if (err) {
            done(err)
          }
          assert.isArray(response.body, 'response body should be an array')
          done()
        })
    })
  })

  describe('#getById', () => {
    let scope
    before(done => {
      // Insert a scope manually...
      let randomIndex = Math.floor( Math.random() * methods.length )
      Scope.create({
        slug: faker.random.word(),
        path: '/' + faker.random.word(),
        method: methods[randomIndex]
      }).then(res => {
        scope = res
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('should return a single Scope object', done => {
      request(app)
        .get('/scopes/' + scope._id)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, response) => {
          if (err) {
            done(err)
          }
          assert.isObject(response.body, 'should be an object')
          assert.containsAllKeys(
            response.body,
            ['_id', 'path', 'slug', 'method'],
            'should return a valid scope object'
          )
          done()
        })
    })

    it('should return 404 when scope does not exist on the database', done => {
      // Make sure database is empty
      Scope.remove({}, () => {
        let sampleObjectId = '5be2baf80c0b5a39f0149066'
        request(app)
          .get('/scopes/' + sampleObjectId)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(404, done)
      })
    })
  })

  describe('#update', () => {
    let randomIndex = Math.floor( Math.random() * methods.length )
    let scopeData = {
      slug: faker.random.word(),
      path: '/' + faker.random.word(),
      method: methods[randomIndex]
    }

    it('should return 404 when scope does not exist on the database', done => {
      // Make sure database is empty
      Scope.remove({}, () => {
        let sampleObjectId = '5be3acd899115e2cd8555901'
        request(app)
          .put('/scopes/' + sampleObjectId)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(404, done)
      })
    })

    it('should update', done => {
      // Insert a scope manually...
      Scope.create(scopeData)
        .then(scope => {
          let scopeUpdate = {
            slug: 'updatedSlug',
            path: '/updatedPath',
            method: 'POST'
          }

          request(app)
            .put('/scopes/' + scope._id)
            .send(scopeUpdate)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, response) => {
              if (err) {
                done(err)
              }
              assert.strictEqual(
                response.body.slug,
                scopeUpdate.slug,
                'updatedSlug'
              )
              assert.strictEqual(
                response.body.path,
                scopeUpdate.path,
                '/updatedPath'
              )
              assert.containsAllKeys(
                response.body,
                ['_id', 'slug', 'path', 'method'],
                'should return a valid scope object'
              )

              done()
            })
        })
        .catch(err => {
          done(err)
        })
    })

    it('should return 400 when invalid data is passed', done => {
      // Insert a scope manually...
      Scope.create(scopeData)
        .then(scope => {
          let scopeUpdate = {
            name: 'Updated Name',
            slug: 'updatedSlug',
            INVALID_KEY: 'no',
          }

          request(app)
            .put('/scopes/' + scope._id)
            .send(scopeUpdate)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(400, done)
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('#delete', () => {
    let randomIndex = Math.floor( Math.random() * methods.length )
    let scopeData = {
      slug: faker.random.word(),
      path: '/' + faker.random.word(),
      method: methods[randomIndex]
    }

    it('should return 404 when scope does not exist on the database', done => {
      // Make sure database is empty
      Scope.remove({}, () => {
        let sampleObjectId = '5be3acd899115e2cd8555901'
        request(app)
          .delete('/scopes/' + sampleObjectId)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(404, done)
      })
    })

    it('should delete', done => {
      // Insert a scope manually...
      Scope.create(scopeData)
        .then(scope => {
          request(app)
            .delete('/scopes/' + scope._id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, response) => {
              Scope.find({ _id: scope._id })
                .then(res => {
                  assert.equal(res.length, 0, 'Should have no matching data')
                  done()
                })
                .catch(err => {
                  done(err)
                })
            })
        })
        .catch(err => {
          done(err)
        })
    })
  })
})