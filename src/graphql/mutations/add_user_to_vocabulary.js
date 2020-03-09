const graphql = require('graphql')
const { GraphQLBoolean, GraphQLString } = graphql
const setSessionData = require('../../helpers/set-session-data')
const VocabularyUserType = require('../types/vocabulary_user_type')
const VocabulariesUsers = require('../../persistence/vocabularies_users')
const {
  MISSING_ARGUMENTS,
  USER_WITHOUT_PERMISSIONS,
} = require('../../helpers/error-messages')
const VocabularyHelpers = require('../../persistence/helpers/vocabularies-helpers')

const addUserToVocabulary = {
  type: VocabularyUserType,
  args: {
    vocabularyID: { type: GraphQLString },
    userID: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
  },
  resolve: (source, { vocabularyID,  userID, admin }, request) => {
    if (!vocabularyID || !userID) {
      throw new Error(MISSING_ARGUMENTS);
    }
    return VocabularyHelpers.checkAdminAccess(vocabularyID, request.session.userID)
      .then(hasAdminAccess => {
        if (!hasAdminAccess) {
          throw new Error(USER_WITHOUT_PERMISSIONS);
        }
        return VocabulariesUsers.create(vocabularyID, userID, admin)
          .then(vocabularyUser => vocabularyUser)
          .catch(err => err);
      })
      .catch(err => err);
  }
};

module.exports = addUserToVocabulary
