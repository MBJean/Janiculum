const graphql = require('graphql')
const { GraphQLBoolean, GraphQLObjectType, GraphQLString } = graphql

const VocabularyEntryType = new GraphQLObjectType({
  name: 'VocabularyEntry',
  fields: {
    id: {
      type: GraphQLString
    }
  }
});

module.exports = VocabularyEntryType
