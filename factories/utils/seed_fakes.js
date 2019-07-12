const _ = require('lodash')
const Factory = require('factory-lady')

function seedPartnerUsers(max){
  let factories = _.range(0, max).map(() => {
    return new Promise((resolve, reject) => {
      require('../index')
      Factory.create('partners', partner => {
        Factory.create('user', { partnerId: partner._id }, user => {
          resolve({ partner, user })
        })
      })
    })
  })

  return factories
}

module.exports.seedPartnerUsers = seedPartnerUsers