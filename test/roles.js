const assert = require('chai').assert
const request = require('supertest')
const faker = require('faker')
const app = require('../app')
const { Role, Scope } = require('../models')
const setupPartners = require('./setup-partners')

require('../factories')
const Factory = require('factory-lady')

describe('RolesController', function() {
  let token
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

  describe('#create', function() {
    let createRole = (data, done) => {
      request(app)
        .post('/roles')
        .send(data)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(400, done)
    }

    it('should create a role', function(done) {
      let job = faker.name.jobTitle()
      request(app)
        .post('/roles')
        .send({
          name: job,
          slug: job.toUpperCase(),
          managerRoleId: null,
          isActive: true,
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .then(response => {
          assert.hasAnyKeys(
            response.body,
            '_id',
            'Should return newly created role'
          )
          done()
        })
        .catch(err => {
          done(err)
        })
    }).timeout(10000)

    it('should return 400 when invalid/no Name is passed', done => {
      let job = faker.name.jobTitle()
      createRole(
        {
          slug: job.toUpperCase(),
        },
        done
      )
    })

    it('should return 400 when invalid/no Slug is passed', done => {
      createRole(
        {
          name: faker.name.jobTitle(),
        },
        done
      )
    })

    it('should return 400 when invalid ManagerRoleId (not Mongo Object ID) is passed', done => {
      let job = faker.name.jobTitle()
      createRole(
        {
          slug: job.toUpperCase(),
          name: job,
          managerRoleId: 'THIS IS NOT A MONGO OBJECT ID',
        },
        done
      )
    })
  })

  describe('#get', () => {
    it('should return an array of roles', done => {
      request(app)
        .get('/roles')
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
    let role
    before(done => {
      // Insert a role manually...
      Factory.create('role', newRole => {
        role = newRole
        done()
      })
    })
    it('should return a single Role object', done => {
      request(app)
        .get('/roles/' + role._id)
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
            ['_id', 'name', 'slug', 'scopes'],
            'should return a valid role object'
          )
          done()
        })
    })

    it('should return 404 when role does not exist on the database', done => {
      // Make sure database is empty
      Role.remove({}, () => {
        let sampleObjectId = '5be2baf80c0b5a39f0149066'
        request(app)
          .get('/roles/' + sampleObjectId)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(404, done)
      })
    })
  })

  describe('#update', () => {
    it('should return 404 when role does not exist on the database', done => {
      // Make sure database is empty
      Role.remove({}, () => {
        let sampleObjectId = '5be3acd899115e2cd8555901'
        request(app)
          .put('/roles/' + sampleObjectId)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(404, done)
      })
    })

    it('should update', done => {
      // Insert a role manually...
      let job = faker.name.jobTitle()

      Role.create({
        name: job,
        slug: job.toUpperCase(),
      })
        .then(role => {
          let roleUpdate = {
            name: 'Updated Name',
            slug: 'updatedSlug',
          }

          request(app)
            .put('/roles/' + role._id)
            .send(roleUpdate)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, response) => {
              if (err) {
                done(err)
              }
              assert.strictEqual(
                response.body.name,
                roleUpdate.name,
                'Should update name'
              )
              assert.strictEqual(
                response.body.slug,
                roleUpdate.slug,
                'Should update slug'
              )
              assert.containsAllKeys(
                response.body,
                ['_id', 'name', 'slug', 'scopes'],
                'should return a valid role object'
              )

              done()
            })
        })
        .catch(err => {
          done(err)
        })
    })

    it('should return 400 when invalid data is passed', done => {
      // Insert a role manually...
      let job = faker.name.jobTitle()

      Role.create({
        name: job,
        slug: job.toUpperCase(),
      })
        .then(role => {
          let roleUpdate = {
            name: 'Updated Name',
            slug: 'updatedSlug',
            INVALID_KEY: 'no',
          }

          request(app)
            .put('/roles/' + role._id)
            .send(roleUpdate)
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
    it('should return 404 when role does not exist on the database', done => {
      // Make sure database is empty
      Role.remove({}, () => {
        let sampleObjectId = '5be3acd899115e2cd8555901'
        request(app)
          .delete('/roles/' + sampleObjectId)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(404, done)
      })
    })

    it('should delete', done => {
      // Insert a role manually...
      let job = faker.name.jobTitle()

      Role.create({
        name: job,
        slug: job.toUpperCase(),
      })
        .then(role => {
          request(app)
            .delete('/roles/' + role._id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, response) => {
              Role.find({ _id: role._id })
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

  describe('#scopes', () => {
    let role
    let scope
    before(done => {
      Factory.create('role', newRole => {
        role = newRole

        Factory.create('scope', newScope => {
          scope = newScope
          done()
        })
      })
    })

    it('should successfully add a scope id', done => {
        
      request(app)
      .post('/roles/' + role._id + '/scopes')
      .send({
        scopeId: scope._id
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        
        Role.findById(role._id).then(r => {
          assert.include(r.scopes, scope._id.toString(), 'should include newly inserted scope _id')
          done()
        }).catch(err => {
          done(err)
        })

      })

    })

    it('should successfully remove a scope id', done => {
        
      request(app)
      .delete('/roles/' + role._id + '/scopes/' + scope._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        
        Role.findById(role._id).then(r => {
          assert.notInclude(r.scopes, scope._id.toString(), 'should not include deleted scope _id')
          done()
        }).catch(err => {
          done(err)
        })

      })

    })

    // it('should return 404 when scope id is not valid', done => {

    //   request(app)
    //   .post('/roles/' + role._id + '/scopes')
    //   .send({
    //     scopeId: '5be8ebcb9664188e03fa98b1'
    //   })
    //   .set('Accept', 'application/json')
    //   .set('Authorization', 'Bearer ' + token)
    //   .expect(404, done)

    // })

  })

}) 
