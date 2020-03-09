const graphql = require('graphql')
const { GraphQLList } = graphql
const VocabularyType = require('../types/vocabulary_type')
const VocabulariesUsers = require('../../persistence/vocabularies_users')
const {
  USER_NOT_AUTHENTICATED,
} = require('../../helpers/error-messages')

const Vocabularies = {
  type: new GraphQLList(VocabularyType),
  resolve: (source, {}, request) => {
    const userID = request.session.userID;
    if (!userID) {
      throw new Error(ErrorMessages.USER_NOT_AUTHENTICATED);
    }
    return VocabulariesUsers.find(userID)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = Vocabularies
