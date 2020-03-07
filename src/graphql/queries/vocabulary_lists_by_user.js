const graphql = require('graphql')
const { GraphQLList } = graphql
const VocabularyListType = require('../types/vocabulary_list_type');
const VocabularyListUser = require('../../persistence/vocabulary_lists_users');

const VocabularyListsByUser = {
  type: new GraphQLList(VocabularyListType),
  resolve: (source, {}, request) => {
    const userID = request.session.userID;
    if (!userID) {
      throw new Error('user not authenticated');
    }
    return VocabularyListUser.find(userID)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = VocabularyListsByUser
