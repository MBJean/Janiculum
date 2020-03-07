const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const VocabularyListType = new GraphQLObjectType({
  name: 'VocbularyList',
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

module.exports = VocabularyListType
