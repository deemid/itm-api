var QRCode = require('qrcode')

module.exports = (req, res, next) => {
  const key = req.body.key
  QRCode.toDataURL(key, function(err, url) {
    res.send(url)
  })
}
