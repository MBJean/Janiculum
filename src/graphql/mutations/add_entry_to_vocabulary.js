const graphql = require('graphql')
const { GraphQLBoolean, GraphQLString } = graphql
const VocabularyEntryType = require('../types/vocabulary_entry_type')
const VocabulariesEntries = require('../../persistence/vocabularies_entries')
const {
  MISSING_ARGUMENTS,
  USER_NOT_AUTHENTICATED,
  USER_WITHOUT_PERMISSIONS,
} = require('../../helpers/error-messages')
const VocabularyHelpers = require('../../persistence/helpers/vocabularies-helpers')
const { getToken } = require('../../middleware/token-middleware')

const addEntryToVocabulary = {
  type: VocabularyEntryType,
  args: {
    vocabularyID: { type: GraphQLString },
    entryID: { type: GraphQLString },
  },
  resolve: (source, { vocabularyID, entryID }, request) => {
    if (!vocabularyID || !entryID) {
      throw new Error(MISSING_ARGUMENTS)
    }
    const token = getToken(request);
    if (!token.payload || !token.payload.id) {
      throw new Error(USER_NOT_AUTHENTICATED)
    }
    return VocabularyHelpers.checkViewAccess(
      vocabularyID,
      token.payload.id
    )
      .then(hasViewAccess => {
        if (!hasViewAccess) {
          throw new Error(USER_WITHOUT_PERMISSIONS)
        }
        return VocabulariesEntries.create(vocabularyID, entryID)
          .then(vocabularyEntry => vocabularyEntry)
          .catch(err => err)
      })
      .catch(err => err)
  },
}

module.exports = addEntryToVocabulary
