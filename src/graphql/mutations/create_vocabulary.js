const graphql = require('graphql')
const { GraphQLString } = graphql
const setSessionData = require('../../helpers/set-session-data')
const VocabularyType = require('../types/vocabulary_type')
const Vocabulary = require('../../persistence/vocabularies')
const {
  MISSING_ARGUMENTS,
  USER_NOT_AUTHENTICATED,
} = require('../../helpers/error-messages')

const createVocabulary = {
  type: VocabularyType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  resolve: (source, { name, description }, request) => {
    if (!name) {
      throw new Error(MISSING_ARGUMENTS)
    }
    if (!request.session.userID) {
      throw new Error(USER_NOT_AUTHENTICATED)
    }
    return Vocabulary.create(name, description, request.session.userID)
      .then(id => id)
      .catch(err => err)
  },
}

module.exports = createVocabulary
