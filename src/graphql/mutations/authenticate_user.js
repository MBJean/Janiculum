const bcrypt = require('bcrypt')
const graphql = require('graphql')
const { GraphQLString } = graphql
const UserType = require('../types/user_type')
const User = require('../../persistence/users')
const {
  AUTHENTICATION_MISMATCH,
  MISSING_ARGUMENTS,
} = require('../../helpers/error-messages')
let jwt = require('jsonwebtoken')
let config = require('../../../config.js')

const authenticateUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: (source, { email, password }, request) => {
    if (!email || !password) {
      throw new Error(MISSING_ARGUMENTS)
    }
    return User.find(email)
      .then(user => {
        if (!user) {
          throw new Error(AUTHENTICATION_MISMATCH)
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            throw new Error(AUTHENTICATION_MISMATCH)
          }
          let token = jwt.sign(
            { id: user.id, email: user.email },
            config.SECRET,
            { expiresIn: '744h' }
          )
          return {
            email: email,
            token: token,
          }
        })
      })
      .catch(err => err)
  },
}

module.exports = authenticateUser
