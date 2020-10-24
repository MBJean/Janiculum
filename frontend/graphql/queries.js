import gql from 'graphql-tag'

export default {
  GET_TEXT: gql`
    query Texts(
      $author: String!
      $title: String!
      $book: String
      $poem: String
      $speech: String
      $chapter: String
      $section: String
    ) {
    	texts(
        author: $author
        title: $title
        book: $book
        poem: $poem
        speech: $speech
        chapter: $chapter
        section: $section
      ) {
        xml
        errors
      }
    }
  `,
  LEMMA_SEARCH: gql`
    query Entries($searchQuery: String!) {
    	entries(searchQuery: $searchQuery) {
        id
        reference_number
        lemma
        body
        orthography
      }
    }
  `,

  STEM_SEARCH: gql`
    query Senses($query: String!) {
    	senses(query: $query) {
        body
      }
    }
  `,
}
