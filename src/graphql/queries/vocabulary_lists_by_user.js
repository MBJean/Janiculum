const graphql = require('graphql')
const { GraphQLList } = graphql
const VocabularyListType = require('../types/vocabulary_list_type');
const VocabularyListUser = require('../../persistence/vocabulary_lists_users');
const ErrorMessages = require('../../helpers/error-messages');

const VocabularyListsByUser = {
  type: new GraphQLList(VocabularyListType),
  resolve: (source, {}, request) => {
    const userID = request.session.userID;
    if (!userID) {
      throw new Error(ErrorMessages.USER_NOT_AUTHENTICATED);
    }
    return VocabularyListUser.find(userID)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = VocabularyListsByUser
