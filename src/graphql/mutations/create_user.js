const graphql = require('graphql')
const { GraphQLString } = graphql
const setSessionData = require('../../helpers/set-session-data')
const UserType = require('../types/user_type')
const User = require('../../persistence/users')
const ErrorMessages = require('../../helpers/error-messages');

const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: (source, { email,  password }, request) => {
    if (!email || !password) {
      throw new Error(ErrorMessages.MISSING_ARGUMENTS);
    }
    return User.create(email, password)
      .then(user => {
        if (!user) {
          throw new Error(ErrorMessages.USER_ALREADY_EXISTS);
        }
        setSessionData(request, user.id, user.email);
        return user;
      })
      .catch(err => err);
  }
};

module.exports = createUser
