const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql
const authenticateUser = require('../mutations/authenticate_user')
const createUser = require('../mutations/create_user')
const createVocabularyForUser = require('../mutations/create_vocabulary_for_user')

const queryType =  new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    authenticateUser,
    createUser,
    createVocabularyForUser
  }
});

module.exports = queryType;
