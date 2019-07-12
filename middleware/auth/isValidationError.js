module.exports = err => {
  return err && err.name === 'ValidationError'
}
