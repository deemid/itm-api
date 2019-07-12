var { getAddress } = require('@utils/wallet')

module.exports = (req, res, next) => {
  const mnemonic = req.body.mnemonic
  if (req.params && req.params.index) {
    let address = getAddress(mnemonic, req.params.index)
    res.json(address)
  }
}
