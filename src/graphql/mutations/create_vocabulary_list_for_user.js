const graphql = require('graphql')
const { GraphQLString } = graphql
const setSessionData = require('../../helpers/set-session-data')
const VocabularyListType = require('../types/vocabulary_list_type')
const VocabularyList = require('../../persistence/vocabulary_lists')
const ErrorMessages = require('../../helpers/error-messages');

const createVocabularyListForUser = {
  type: VocabularyListType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  },
  resolve: (source, { name,  description }, request) => {
    if (!name) {
      throw new Error(ErrorMessages.MISSING_ARGUMENTS);
    }
    if (!request.session.userID) {
      throw new Error(ErrorMessages.USER_NOT_AUTHENTICATED);
    }
    return VocabularyList.createForUser(name, description, request.session.userID)
      .then(id => id)
      .catch(err => err);
  }
};

module.exports = createVocabularyListForUser
