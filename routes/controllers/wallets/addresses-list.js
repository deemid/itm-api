const { getAddress } = require('@utils/wallet')

module.exports = function(req, res, next) {
  const mnemonic = req.body.mnemonic
  let addresses = []
  for (let i = 0; i < 5; i++) {
    addresses.push(getAddress(mnemonic, i))
  }
  res.json(addresses)
}
