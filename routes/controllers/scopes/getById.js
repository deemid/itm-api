const promise = require('@promise')
const { Scope } = require('@models')

module.exports = async (req, res) => {
  res.status(200).json(req.scope)
}
