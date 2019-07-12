const promise = promise => {
  return new Promise((resolve, reject) => {
    promise
      .then(res => resolve({ err: null, res: res }))
      .catch(err => resolve({ err: err, res: null }))
  })
}

module.exports = promise
