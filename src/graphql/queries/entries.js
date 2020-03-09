const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const EntryType = require('../types/entry_type')
const Entry = require('../../persistence/entries')

const Entries = {
  type: new GraphQLList(EntryType),
  args: {
    searchQuery: { type: GraphQLString },
  },
  resolve: (source, { searchQuery }) => {
    return Entry.search(searchQuery)
      .then(res => res)
      .catch(err => err)
  },
}

module.exports = Entries
