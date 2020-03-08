const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql
const authenticateUser = require('../mutations/authenticate_user')
const createUser = require('../mutations/create_user')
const createVocabularyListForUser = require('../mutations/create_vocabulary_list_for_user')

const queryType =  new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    authenticateUser,
    createUser,
    createVocabularyListForUser
  }
});

module.exports = queryType;
