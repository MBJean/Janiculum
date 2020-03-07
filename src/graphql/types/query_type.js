const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const DictionaryEntries = require('../queries/dictionary_entries');
const VocabularyListByUser = require('../queries/vocabulary_list_by_user');
const VocabularyListsByUser = require('../queries/vocabulary_lists_by_user');

const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    dictionaryEntries: DictionaryEntries,
    vocabularyListByUser: VocabularyListByUser,
    vocabularyListsByUser: VocabularyListsByUser
  }
});

module.exports = queryType;
