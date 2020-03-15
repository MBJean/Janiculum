const graphql = require('graphql')
const { GraphQLString } = graphql
const VocabularyType = require('../types/vocabulary_type')
const Vocabulary = require('../../persistence/vocabularies')
const {
  MISSING_ARGUMENTS,
  USER_NOT_AUTHENTICATED,
} = require('../../helpers/error-messages')
const { getToken } = require('../../middleware/token-middleware')

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
    const token = getToken(request)
    if (!token.payload || !token.payload.id) {
      throw new Error(USER_NOT_AUTHENTICATED)
    }
    return Vocabulary.create(name, description, token.payload.id)
      .then(id => id)
      .catch(err => err)
  },
}

module.exports = createVocabulary
