const promise = require('@promise')
const { Partner } = require('@models')

module.exports = async (req, res, next, id) => {
  let companyId = id
  let getPartner = Partner.findById(companyId)

  let { res: data, err } = await promise(getPartner)

  if (err) {
    res.status(422).json(err)
  } else if (!data) {
    res.status(404).json({ message: 'Does not exist' })
  } else {
    req.partner = data
    next()
  }
}
