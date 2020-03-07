const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const createUser = require('../mutations/create_user');

const queryType =  new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser
  }
});

module.exports = queryType;
