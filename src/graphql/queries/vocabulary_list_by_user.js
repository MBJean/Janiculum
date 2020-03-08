const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const DictionaryEntryType = require('../types/dictionary_entry_type');
const VocabularyListDictionaryEntry = require('../../persistence/vocabulary_lists_dictionary_entries');
const ErrorMessages = require('../../helpers/error-messages');

const VocabularyListByUser = {
  type: new GraphQLList(DictionaryEntryType),
  args: {
    id: { type: GraphQLString }
  },
  resolve: (source, { id }, request) => {
    const userID = request.session.userID;
    if (!userID) {
      throw new Error(ErrorMessages.USER_NOT_AUTHENTICATED);
    }
    return VocabularyListDictionaryEntry.find(id, userID)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = VocabularyListByUser
