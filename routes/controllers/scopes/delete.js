const promise = require('@promise')
const { Scope } = require('@models')

module.exports = async (req, res) => {
  let deleteScope = Scope.deleteOne({ _id: req.scope._id })

  let { res: data, err } = await promise(deleteScope)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
