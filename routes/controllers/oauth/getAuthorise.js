module.exports = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect(
      '/session?redirect=' +
        req.path +
        '&client_id=' +
        req.query.client_id +
        '&grant_type=' +
        req.query.grant_type
    )
  }

  res.render('authorise', {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri,
  })
}
