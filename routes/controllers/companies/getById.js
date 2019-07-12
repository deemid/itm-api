const promise = require('@promise')
const { Partner } = require('@models')

module.exports = async (req, res, next) => {
  let users = await req.partner.findUsers()
  users.map(partnerUser => {
    return partnerUser.toJSON()
  })
  res.status(200).send({
    ...req.partner.toJSON(),
    users
  })
}
