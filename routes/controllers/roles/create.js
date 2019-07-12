const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {
  // Make scopes an array if a single string is passed
  if (typeof req.body.scopes === 'string') {
    req.body.scopes = [req.body.scopes]
  }

  // Create Role
  let createRole = Role.create(req.body)

  let { res: data, err } = await promise(createRole)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(201).json(data)
  }
}
