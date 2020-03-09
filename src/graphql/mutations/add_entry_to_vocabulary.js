const graphql = require('graphql')
const { GraphQLBoolean, GraphQLString } = graphql
const setSessionData = require('../../helpers/set-session-data')
const VocabularyEntryType = require('../types/vocabulary_entry_type')
const VocabulariesEntries = require('../../persistence/vocabularies_entries')
const {
  MISSING_ARGUMENTS,
  USER_NOT_AUTHENTICATED,
  USER_WITHOUT_PERMISSIONS,
} = require('../../helpers/error-messages')
const VocabularyHelpers = require('../../persistence/helpers/vocabularies-helpers')

const addEntryToVocabulary = {
  type: VocabularyEntryType,
  args: {
    vocabularyID: { type: GraphQLString },
    entryID: { type: GraphQLString }
  },
  resolve: (source, { vocabularyID,  entryID }, request) => {
    if (!vocabularyID || !entryID) {
      throw new Error(MISSING_ARGUMENTS);
    }
    if (!request.session.userID) {
      throw new Error(USER_NOT_AUTHENTICATED);
    }
    return VocabularyHelpers.checkViewAccess(vocabularyID, request.session.userID)
      .then(hasViewAccess => {
        if (!hasViewAccess) {
          throw new Error(USER_WITHOUT_PERMISSIONS);
        }
        return VocabulariesEntries.create(vocabularyID, entryID)
          .then(vocabularyEntry => vocabularyEntry)
          .catch(err => err);
      })
      .catch(err => err);
  }
};

module.exports = addEntryToVocabulary
