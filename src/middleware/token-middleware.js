const jwt = require('jsonwebtoken')
const config = require('../../config.js')

const getToken = req => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length)
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return false
      } else {
        return jwt.decode(token)
      }
    })
  } else {
    return false
  }
}

module.exports = {
  getToken,
}
