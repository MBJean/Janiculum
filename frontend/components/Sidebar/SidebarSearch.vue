<template>
  <div>
    <label class="form__container">
      <p>Search for a Latin word</p>
      <input
        class="form__input"
        :value="query"
        @input="onChange"
      />
    </label>
    <p v-if="searching">Searching...</p>
    <p v-else-if="error">Sorry, an error occurred. Please try again</p>
    <p v-else-if="help">{{ help }}</p>
    <ol
      v-else-if="suggestions && suggestions.length"
      class="form__list"
    >
      <li
        v-for="suggestion in suggestions"
        class="form__list-item"
        @click="onClickSuggestion(suggestion)"
      >
        {{ suggestion.lemma }}
      </li>
    </ol>
  </div>
</template>

<script>
import QUERIES from '~/graphql/queries'
import * as debounce from 'lodash.debounce'

const HELP_MESSAGES = {
  NO_MATCH: 'No match, please search again.'
}

export default {
  data() {
    return {
      error: false,
      help: null,
      query: '',
      searching: false,
      suggestions: null
    }
  },
  computed: {
    HELP_MESSAGES() {
      return HELP_MESSAGES;
    }
  },
  methods: {
    onChange: debounce(function(event) {
      const query = event.target.value;
      this.query = query;
      this.searchDictionary();
    }, 500),

    onClickSuggestion(suggestion) {
      this.$emit('selectSuggestion', suggestion);
      this.reset();
    },

    parseResponse(response) {
      if (!response.data || !response.data.entries) {
        this.error = true;
        return;
      }
      const entries = response.data.entries;
      if (entries.length == 0) {
        this.help = this.HELP_MESSAGES.NO_MATCH;
      } else {
        this.suggestions = entries;
      }
    },

    reset() {
      this.error = false;
      this.help = null;
      this.query = '';
      this.searching = false;
      this.suggestions = null;
    },

    searchDictionary() {
      this.searching = true;
      this.error = false;
      this.$apollo
        .query({
          query: QUERIES.LEMMA_SEARCH,
          variables: { searchQuery: this.query },
        })
        .then(response => {
          this.help = null;
          this.parseResponse(response);
        })
        .catch(error => {
          this.error = true;
        })
        .finally(() => {
          this.searching = false;
        })
    },
  }
}

</script>

<style lang="scss" scoped="true">
li {
  cursor: pointer;
}
p {
  font-size: $font-size-5;
}
</style>
