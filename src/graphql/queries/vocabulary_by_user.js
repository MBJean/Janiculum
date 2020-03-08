const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const EntryType = require('../types/entry_type');
const VocabulariesEntries = require('../../persistence/vocabularies_entries');
const ErrorMessages = require('../../helpers/error-messages');

const VocabularyByUser = {
  type: new GraphQLList(EntryType),
  args: {
    id: { type: GraphQLString }
  },
  resolve: (source, { id }, request) => {
    const userID = request.session.userID;
    if (!userID) {
      throw new Error(ErrorMessages.USER_NOT_AUTHENTICATED);
    }
    return VocabulariesEntries.find(id, userID)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = VocabularyByUser
