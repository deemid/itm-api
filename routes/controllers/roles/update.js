const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {
  req.role = Object.assign(req.role, req.body)
  let updateRole = req.role.save()

  let { res: data, err } = await promise(updateRole)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
