const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql
const addEntryToVocabulary = require('../mutations/add_entry_to_vocabulary')
const addUserToVocabulary = require('../mutations/add_user_to_vocabulary')
const authenticateUser = require('../mutations/authenticate_user')
const createUser = require('../mutations/create_user')
const createVocabulary = require('../mutations/create_vocabulary')

const queryType =  new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEntryToVocabulary,
    addUserToVocabulary,
    authenticateUser,
    createUser,
    createVocabulary
  }
});

module.exports = queryType;
