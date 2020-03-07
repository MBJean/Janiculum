const bcrypt = require('bcrypt');
const graphql = require('graphql')
const { GraphQLString } = graphql
const setSessionData = require('../../helpers/set-session-data')
const UserType = require('../types/user_type')
const User = require('../../persistence/users')

const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: (source, { email,  password }, request) => {
    if (!email || !password) {
      throw new Error('missing arguments');
    }
    return User.find(email)
      .then(user => {
        if (!user) {
          throw new Error('email or password does not match');
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              throw new Error('email or password does not match');
            };
            setSessionData(request, user.id, user.email);
            return user;
          });
      })
      .catch(err => err);
  }
};

module.exports = createUser
