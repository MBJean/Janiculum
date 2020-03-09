const graphql = require('graphql')
const { GraphQLSchema } = graphql
const queryType = require('./types/query_type')
const mutationType = require('./types/mutation_type')

const schema = new GraphQLSchema({
  mutation: mutationType,
  query: queryType,
})

module.exports = schema
