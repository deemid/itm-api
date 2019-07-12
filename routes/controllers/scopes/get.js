const promise = require('@promise')
const { Scope } = require('@models')

module.exports = async (req, res) => {
  let getScopes = Scope.find()

  let { res: data, err } = await promise(getScopes)

  if (err) {
    res.status(422).json(err)
  } else {
    res.status(200).json(data)
  }
}
