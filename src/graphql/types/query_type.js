const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const entries = require('../queries/entries')
const senses = require('../queries/senses')
const vocabulary = require('../queries/vocabulary')
const vocabularies = require('../queries/vocabularies')

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    entries,
    senses,
    vocabulary,
    vocabularies,
  },
})

module.exports = queryType
