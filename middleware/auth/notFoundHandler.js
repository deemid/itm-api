module.exports = (req, res, next) => {
  res.status(404)
  res.format({
    html: function() {
      res.render('404', { url: req.url })
    },
    json: function() {
      res.send({ error: 'Not Found' })
    },
  })
}
