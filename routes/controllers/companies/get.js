const mongoose = require('mongoose')
const { User, Partner, UserWallet } = require('@models')

module.exports = (req, res, next) => {
  Partner.find().sort({_id: -1}).then(async partners => {
    let usersPromises = partners.map(partner => {
      return partner.findUsers()
    })

    let users = await Promise.all(usersPromises)

    users = users.map(partnerUsers => {
      return partnerUsers.map(partnerUser => {
        return partnerUser.toJSON()
      })
    })

    let partnersWithUsers = partners.map((partner, index) => {
      return {
        ...partner.toJSON(),
        users: users[index],
      }
    })
    res.status(200).send(partnersWithUsers)
  })
}
