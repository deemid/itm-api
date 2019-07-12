const promise = require('@promise')
const { Scope } = require('@models')

module.exports = async (req, res) => {
  // Create Scope
  let createScope = Scope.create(req.body)

  let { res: data, err } = await promise(createScope)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(201).json(data)
  }
}
