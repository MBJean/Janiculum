const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const entries = require('../queries/entries');
const vocabularyByUser = require('../queries/vocabulary_by_user');
const vocabulariesByUser = require('../queries/vocabularies_by_user');

const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    entries,
    vocabularyByUser,
    vocabulariesByUser
  }
});

module.exports = queryType;
