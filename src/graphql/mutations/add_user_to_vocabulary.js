const graphql = require('graphql')
const { GraphQLBoolean, GraphQLString } = graphql
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
  resolve: (source, { vocabularyID, userID, admin }, request) => {
    if (!vocabularyID || !userID) {
      throw new Error(MISSING_ARGUMENTS)
    }
    const token = getToken(request);
    if (!token.payload || !token.payload.id) {
      throw new Error(USER_NOT_AUTHENTICATED)
    }
    return VocabularyHelpers.checkAdminAccess(
      vocabularyID,
      token.payload.id
    )
      .then(hasAdminAccess => {
        if (!hasAdminAccess) {
          throw new Error(USER_WITHOUT_PERMISSIONS)
        }
        return VocabulariesUsers.create(vocabularyID, userID, admin)
          .then(vocabularyUser => vocabularyUser)
          .catch(err => err)
      })
      .catch(err => err)
  },
}

module.exports = addUserToVocabulary
