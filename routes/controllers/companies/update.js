const promise = require('@promise')
const { Partner } = require('@models')

module.exports = async (req, res) => {
  req.partner = Object.assign(req.partner, req.body)
  let updatePartner = req.partner.save()

  let { res: data, err } = await promise(updatePartner)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json({ success: true, data })
  }
}
