const graphql = require('graphql')
const { GraphQLBoolean, GraphQLObjectType, GraphQLString } = graphql

const VocabularyUserType = new GraphQLObjectType({
  name: 'VocabularyUser',
  fields: {
    id: {
      type: GraphQLString
    },
    admin: {
      type: GraphQLBoolean
    }
  }
});

module.exports = VocabularyUserType
