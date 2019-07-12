const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {
  if (!req.role.scopes.includes(req.body.scopeId)) {
    req.role = Object.assign(
      req.role,
      { scopes: [...req.role.scopes, req.body.scopeId] }
    )
  }
  
  let updateRole = req.role.save()

  let { res: data, err } = await promise(updateRole)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(201).json(data)
  }
}
