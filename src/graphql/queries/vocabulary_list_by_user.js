const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const DictionaryEntryType = require('../types/dictionary_entry_type');
const VocabularyListDictionaryEntry = require('../../persistence/vocabulary_lists_dictionary_entries');

const VocabularyListByUser = {
  type: new GraphQLList(DictionaryEntryType),
  args: {
    id: { type: GraphQLString }
  },
  resolve: (source, args, request) => {
    const userID = request.session.userID;
    if (!userID) {
      throw new Error('user not authenticated');
    }
    return VocabularyListDictionaryEntry.find(id, userID)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = VocabularyListByUser
