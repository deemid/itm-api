const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {
  res.status(200).json(req.role)
}
