const assert = require('chai').assert
const request = require('supertest')
const faker = require('faker')
const mongoose = require('mongoose')
const _ = require('lodash')
require('../factories')
const Factory = require('factory-lady')
const setupPartners = require('./setup-partners')
const { User, UserWallet, Role, Partner } = require('../models')
const { decrypt } = require('../utils/crypto')

describe('CompanyController', () => {
  describe('#create', () => {
    const app = require('../app')
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
    it('should create a company with a user', done => {
      let email = faker.internet.email()
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        request(app)
          .post('/companies')
          .send({
            companyName: faker.company.companyName(),
            email,
            name: faker.name.findName(),
            roleId: role._id,
          })
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(201)
          .then(response => {
            assert.equal(response.body.success, true, 'Should be true')
            User.findOne({ email }).then(user => {
              assert.isNotNull(user)
              assert.isNotNull(user.mnemonic)
              let mnemonicDecrypt = decrypt(user.mnemonic)
              assert.equal(mnemonicDecrypt.split(' ').length, 12)

              UserWallet.find().then(userWallets => {
                assert.equal(
                  userWallets.length,
                  10,
                  'Should store initial 10 wallets'
                )
                done()
              })
            })
          })
      })
    }).timeout(10000)

    it('should fail creating a company when invalid email has been passed', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        request(app)
          .post('/companies')
          .send({
            email: 'blahblah@',
            name: faker.name.findName(),
            companyName: faker.company.companyName(),
            roleId: role._id,
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
      })
    }).timeout(10000)

    it('should fail creating a company when email is already registered', done => {
      let email = faker.internet.email()
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        Factory.create('user', { email }, user => {
          request(app)
            .post('/companies')
            .send({
              email,
              name: faker.name.findName(),
              companyName: faker.company.companyName(),
              roleId: role._id,
            })
            .set('Accept', 'application/json')
            .expect(400)
            .then(response => {
              assert.isTrue(response.error.text === 'Already existing')
              done()
            })
        })
      })
    }).timeout(10000)

    it('should fail creating a company when company name is missing', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        request(app)
          .post('/companies')
          .send({
            email: faker.internet.email(),
            name: faker.name.findName(),
            role: role._id,
          })
          .set('Accept', 'application/json')
          .expect(400)
          .then(response => {
            assert.isTrue(
              response.body.validation.keys.includes('companyName'),
              'Should have errors for email'
            )
            done()
          })
      })
    }).timeout(10000)

    it("should fail creating a company when user's name is missing", done => {
      request(app)
        .post('/companies')
        .send({
          email: faker.internet.email(),
          companyName: faker.company.companyName(),
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then(response => {
          assert.isTrue(
            response.body.validation.keys.includes('name'),
            'Should have errors for email'
          )
          done()
        })
    }).timeout(10000)

    after(function(done) {
      this.timeout(10000)
      mongoose.connection.dropDatabase().then(() => {
        done()
      })
    })
  })

  describe('#get', () => {
    const app = require('../app')
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

    it('should list companies', done => {
      let factories = _.range(0, 5).map(() => {
        return new Promise((resolve, reject) => {
          Factory.create('partners', partner => {
            Factory.create('user', { partnerId: partner._id }, user => {
              resolve({ partner, user })
            })
          })
        })
      })

      Promise.all(factories).then(userPartner => {
        request(app)
          .get('/companies')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          .then(response => {
            assert.isTrue(response.body.length === 5)
            assert.isTrue(response.body[0].users.length > 0)
            done()
          })
      })
    }).timeout(10000)

    after(function(done) {
      this.timeout(10000)
      mongoose.connection.dropDatabase().then(() => {
        done()
      })
    })
  })

  describe('#update', () => {
    const app = require('../app')
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

    it('should update company info', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        Factory.create('partners', savedPartner => {
          Factory.create('user', { partnerId: savedPartner._id }, user => {
            Factory.build('partners', buildPartner => {
              buildPartner['_id'] = undefined
              request(app)
                .put('/companies/' + savedPartner._id)
                .send(buildPartner)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .then(response => {
                  console.log(response.body)
                  assert.equal(response.body.success, true, 'Should be true')
                  Partner.findById(savedPartner._id).then(checkPartner => {
                    assert.equal(
                      checkPartner.partnerName,
                      savedPartner.partnerName,
                      'Should be equal'
                    )
                    done()
                  })
                })
            })
          })
        })
      })
    }).timeout(10000)

    it('should not update company info when partnerName is missing', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        Factory.create('partners', savedPartner => {
          Factory.create('user', { partnerId: savedPartner._id }, user => {
            Factory.build('partners', buildPartner => {
              buildPartner.partnerName = null
              request(app)
                .put('/companies/' + savedPartner._id)
                .send(buildPartner)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(400)
                .then(response => {
                  assert.isTrue(
                    response.body.validation.keys.includes('partnerName'),
                    'Should have errors for partnerName'
                  )
                  done()
                })
            })
          })
        })
      })
    }).timeout(10000)


    it('should not update company info when unknow plugin was passed', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        Factory.create('partners', savedPartner => {
          Factory.create('user', { partnerId: savedPartner._id }, user => {
            Factory.build('partners', buildPartner => {
              buildPartner.plugins.push('somerandomplugin')
              request(app)
                .put('/companies/' + savedPartner._id)
                .send(buildPartner)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(400)
                .then(response => {
                  assert.isTrue(
                    response.body.validation.keys.includes('plugins.5'),
                    'Should have errors for plugins'
                  )
                  done()
                })
            })
          })
        })
      })
    }).timeout(10000)

    it('should not update company info when unknown category is passed', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        Factory.create('partners', savedPartner => {
          Factory.create('user', { partnerId: savedPartner._id }, user => {
            Factory.build('partners', buildPartner => {
              buildPartner.categories.push('pornography')
              request(app)
                .put('/companies/' + savedPartner._id)
                .send(buildPartner)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(400)
                .then(response => {
                  assert.isTrue(
                    response.body.validation.keys.includes('categories.5'),
                    'Should have errors for categories'
                  )
                  done()
                })
            })
          })
        })
      })
    }).timeout(10000)

    it('should not update company info when unknown targetAudience is passed', done => {
      Role.findOne({ slug: 'PARTNER_MANAGER' }).then(role => {
        Factory.create('partners', savedPartner => {
          Factory.create('user', { partnerId: savedPartner._id }, user => {
            Factory.build('partners', buildPartner => {
              buildPartner.targetAudience.push('minor')
              request(app)
                .put('/companies/' + savedPartner._id)
                .send(buildPartner)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(400)
                .then(response => {
                  assert.isTrue(
                    response.body.validation.keys.includes('targetAudience.5'),
                    'Should have errors for targetAudience'
                  )
                  done()
                })
            })
          })
        })
      })
    }).timeout(10000)

    after(function(done) {
      this.timeout(10000)
      mongoose.connection.dropDatabase().then(() => {
        done()
      })
    })
  })
})
