const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

const DictionaryEntry = require('../persistence/dictionary_entries');

const dictionaryEntryType = new GraphQLObjectType({
  name: 'DictionaryEntry',
  fields: {
    id: {
      type: GraphQLString
    },
    reference_number: {
      type: GraphQLString
    },
    lemma: {
      type: GraphQLString
    },
    body: {
      type: GraphQLString
    }
  }
});

const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    dictionaryEntries: {
      type: new GraphQLList(dictionaryEntryType),
      args: {
        searchQuery: { type: GraphQLString }
      },
      resolve: (source, { searchQuery }) => {
        return DictionaryEntry.search(searchQuery)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema
