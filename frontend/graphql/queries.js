import gql from 'graphql-tag'

export default {
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
