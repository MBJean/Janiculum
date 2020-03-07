const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const DictionaryEntryType = new GraphQLObjectType({
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

module.exports = DictionaryEntryType
