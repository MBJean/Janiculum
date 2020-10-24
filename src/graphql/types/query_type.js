const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const entries = require('../queries/entries')
const senses = require('../queries/senses')
const texts = require('../queries/texts')
const vocabulary = require('../queries/vocabulary')
const vocabularies = require('../queries/vocabularies')

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    entries,
    senses,
    texts,
    vocabulary,
    vocabularies,
  },
})

module.exports = queryType
