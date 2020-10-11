const graphql = require('graphql')
const { GraphQLList, GraphQLString } = graphql
const TextType = require('../types/text_type')
const Text = require('../../persistence/texts')

const Texts = {
  type: TextType,
  args: {
    author: { type: GraphQLString },
    title: { type: GraphQLString },
    book: { type: GraphQLString },
    poem: { type: GraphQLString },
  },
  resolve: async (source, { author, title, book, poem }) => {
    try {
      const text = await Text.search(author, title)
      if (!text) {
        return {
          xml: null,
          errors: ['no match on text']
        }
      }
      let query = '//'
      if (book) {
        query += `div[@type=\"textpart\" and @subtype=\"book\" and @n=\"${book}\"]`
      }
      if (poem) {
        query += `/div[@type=\"textpart\" and @subtype=\"poem\" and @n=\"${poem}\"]`
      }
      const response = await Text.query(text.id, query)
      if (!response) {
        return {
          xml: null,
          errors: ['no match on query']
        }
      }
      return {
        xml: response,
        errors: null,
      }
    } catch(error) {
      return {
        xml: null,
        errors: ['unknown error']
      }
    }
  },
}

module.exports = Texts
