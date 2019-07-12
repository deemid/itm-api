const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {

  let scopes = req.role.scopes.filter(scopeId => scopeId.toString() !== req.params.scopeId.toString())

  req.role = Object.assign(
    req.role,
    { scopes }
  )
  
  let updateRole = req.role.save()

  let { res: data, err } = await promise(updateRole)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
