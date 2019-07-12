const axios = require('axios')
const qs = require('qs')
const { OAuthClientsModel } = require('@models')

module.exports = async (req, res, next) => {
  let { client_id, username, password } = req.body

  let client = await OAuthClientsModel.findOne({
    clientId: client_id,
  })

  let reqBody = qs.stringify({
    grant_type: 'password',
    client_id,
    client_secret: client.clientSecret,
    username,
    password,
  })

  let api = axios.create({
    baseURL: process.env.API_BASE_URL,
  })

  try {
    let response = await api.post('/oauth/token', reqBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    let tokenDetails = qs.stringify(response.data)

    res.redirect(client.redirectUri + '#' + tokenDetails)
  } catch (err) {
    req.flash('error', 'Invalid Credentials')
    return res.redirect(
      '/session?redirect=' +
        req.path +
        '&client_id=' +
        client_id +
        '&grant_type=implicit'
    )
  }
}
