const graphql = require('graphql')
const { GraphQLString } = graphql
const UserType = require('../types/user_type')
const User = require('../../persistence/users')
const {
  MISSING_ARGUMENTS,
  USER_ALREADY_EXISTS,
} = require('../../helpers/error-messages')
let jwt = require('jsonwebtoken')
let config = require('../../../config.js')

const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: (source, { email, password }, request) => {
    if (!email || !password) {
      throw new Error(MISSING_ARGUMENTS)
    }
    return User.create(email, password)
      .then(user => {
        if (!user) {
          throw new Error(USER_ALREADY_EXISTS)
        }
        let token = jwt.sign(
          { id: user.id, email: user.email },
          config.SECRET,
          { expiresIn: '744h'}
        );
        return {
          email: email,
          token: token
        }
      })
      .catch(err => err)
  },
}

module.exports = createUser
