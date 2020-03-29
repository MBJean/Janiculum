const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const StemType = require('../types/stem_type')
const Stem = require('../../persistence/stems')

const Stems = {
  type: new GraphQLList(StemType),
  args: {
    query: { type: GraphQLString },
  },
  resolve: (source, { query }) => {
    return Stem.search(query)
      .then(res => res)
      .catch(err => err)
  },
}

module.exports = Stems
