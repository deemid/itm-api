const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res, next, id) => {
  let roleId = id
  let getRole = Role.findById(roleId)

  let { res: data, err } = await promise(getRole)

  if (err) {
    res.status(422).json(err)
  } else if (!data) {
    res.status(404).json({ message: 'Does not exist' })
  } else {
    req.role = data
    next()
  }
}
