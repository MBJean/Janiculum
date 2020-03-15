const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const EntryType = require('../types/entry_type')
const VocabulariesEntries = require('../../persistence/vocabularies_entries')
const { USER_NOT_AUTHENTICATED } = require('../../helpers/error-messages')
const { getToken } = require('../../middleware/token-middleware')

const Vocabulary = {
  type: new GraphQLList(EntryType),
  args: {
    id: { type: GraphQLString },
  },
  resolve: (source, { id }, request) => {
    const token = getToken(request)
    if (!token.payload || !token.payload.id) {
      throw new Error(USER_NOT_AUTHENTICATED)
    }
    return VocabulariesEntries.find(id, token.payload.id)
      .then(res => res)
      .catch(err => err)
  },
}

module.exports = Vocabulary
