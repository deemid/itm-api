const promise = require('@promise')
const { Scope } = require('@models')

module.exports = async (req, res, next, id) => {
  let scopeId = id
  let getScope = Scope.findById(scopeId)

  let { res: data, err } = await promise(getScope)

  if (err) {
    res.status(422).json(err)
  } else if (!data) {
    res.status(404).json({ message: 'Does not exist' })
  } else {
    req.scope = data
    next()
  }
}
