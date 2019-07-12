const { OAuthClientsModel } = require('@models')

module.exports = async (req, res, next) => {
  let url = '/oauth/token'
  if (req.query.grant_type === 'implicit') {
    url = '/oauth/implicit'
  }

  let client = await OAuthClientsModel.findOne({
    clientId: req.query.client_id,
  })

  res.render('pages/session/index', {
    client_id: req.query.client_id,
    client_secret: client.clientSecret,
    grant_type: req.query.grant_type,
    url,
    partners: req.partners,
    contents: req.contents,
  })
}
