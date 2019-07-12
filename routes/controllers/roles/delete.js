const promise = require('@promise')
const { Role } = require('@models')

module.exports = async (req, res) => {
  let deleteRole = Role.deleteOne({ _id: req.role._id })

  let { res: data, err } = await promise(deleteRole)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
