const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const StemType = new GraphQLObjectType({
  name: 'Stem',
  fields: {
    body: {
      type: GraphQLString,
    },
  },
})

module.exports = StemType
