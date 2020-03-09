const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const EntryType = new GraphQLObjectType({
  name: 'Entry',
  fields: {
    id: {
      type: GraphQLString,
    },
    reference_number: {
      type: GraphQLString,
    },
    lemma: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
  },
})

module.exports = EntryType
