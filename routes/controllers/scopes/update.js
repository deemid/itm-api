const promise = require('@promise')
const { Scope } = require('@models')

module.exports = async (req, res) => {
  req.scope = Object.assign(req.scope, req.body)
  let updateScope = req.scope.save()

  let { res: data, err } = await promise(updateScope)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
