module.exports = (req, res, next) => {
  if (req.session.userId) {
    req.user = { id: req.session.userId }
    req.session.userId = req.user.id
    next()
  } else {
    res.app.oauth.authorise()(req, res, next)
  }
}
