const graphql = require('graphql')
const { GraphQLList, GraphQLObjectType, GraphQLString } = graphql

const TextType = new GraphQLObjectType({
  name: 'Text',
  fields: {
    xml: {
      type: GraphQLString,
    },
    errors: {
      type: new GraphQLList(GraphQLString)
    }
  },
})

module.exports = TextType
