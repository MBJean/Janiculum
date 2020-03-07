const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql
const UserType = require('../types/user_type');
const User = require('../../persistence/users');

const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: (source, { email,  password }) => {
    if (!email || !password) {
      throw new Error('missing arguments');
    }
    return User.create(email, password)
      .then(res => {
        if (!res) {
          throw new Error('user already exists');
        }
        return res;
      })
      .catch(err => err);
  }
};

module.exports = createUser
