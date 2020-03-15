const graphql = require('graphql')
const { GraphQLList } = graphql
const VocabularyType = require('../types/vocabulary_type')
const VocabulariesUsers = require('../../persistence/vocabularies_users')
const { USER_NOT_AUTHENTICATED } = require('../../helpers/error-messages')
const { getToken } = require('../../middleware/token-middleware')

const Vocabularies = {
  type: new GraphQLList(VocabularyType),
  resolve: (source, {}, request) => {
    const token = getToken(request)
    if (!token.payload || !token.payload.id) {
      throw new Error(USER_NOT_AUTHENTICATED)
    }
    return VocabulariesUsers.find(token.payload.id)
      .then(res => res)
      .catch(err => err)
  },
}

module.exports = Vocabularies
