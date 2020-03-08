const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const VocabularyType = new GraphQLObjectType({
  name: 'Vocabulary',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

module.exports = VocabularyType
