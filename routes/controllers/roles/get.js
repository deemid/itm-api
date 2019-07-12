const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {
  let getRoles = Role.find()

  let { res: data, err } = await promise(getRoles)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
