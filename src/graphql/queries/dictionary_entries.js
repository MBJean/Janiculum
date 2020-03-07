const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const DictionaryEntryType = require('../types/dictionary_entry_type');
const DictionaryEntry = require('../../persistence/dictionary_entries');

const DictionaryEntries = {
  type: new GraphQLList(DictionaryEntryType),
  args: {
    searchQuery: { type: GraphQLString }
  },
  resolve: (source, { searchQuery }) => {
    return DictionaryEntry.search(searchQuery)
      .then(res => res)
      .catch(err => err);
  }
}

module.exports = DictionaryEntries
