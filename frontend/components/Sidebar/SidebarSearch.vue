<template>
  <div v-on-clickaway="close">
    <label class="form__container">
      <p class="form__label">Search for a Latin word</p>
      <input
        class="form__input"
        :value="query"
        @input="onChange"
        @focus="onFocus"
      />
    </label>
    <p v-if="searching">Searching...</p>
    <p v-else-if="error">Sorry, an error occurred. Please try again</p>
    <p v-else-if="help">{{ help }}</p>
    <ol
      v-else-if="suggestions && suggestions.length && open"
      class="form__list"
    >
      <li
        v-for="suggestion in suggestions"
        class="form__list-item"
        @click="onClickSuggestion(suggestion)"
      >
        <div class="text--overflow">
          <span>{{ suggestion.orthography }}</span>
        </div>
      </li>
    </ol>
    <EntryBase
      v-if="selection"
      :body="selection.body"
    />
  </div>
</template>

<script>
import QUERIES from '~/graphql/queries'
import * as debounce from 'lodash.debounce'
import EntryBase from '~/components/Entry/EntryBase.vue'
import { mixin as clickaway } from 'vue-clickaway';

const HELP_MESSAGES = {
  NO_MATCH: 'No match, please search again.'
}

export default {
  components: {
    EntryBase
  },
  data() {
    return {
      error: false,
      help: null,
      open: false,
      query: '',
      searching: false,
      selection: null,
      suggestions: null
    }
  },
  computed: {
    HELP_MESSAGES() {
      return HELP_MESSAGES;
    }
  },
  methods: {

    close() {
      this.open = false;
    },

    onChange: debounce(function(event) {
      const query = event.target.value;
      this.query = query;
      this.searchDictionary();
    }, 500),

    onClickSuggestion(suggestion) {
      this.close();
      this.selection = suggestion;
    },

    onFocus() {
      if (this.query.length && this.suggestions.length) {
        this.open = true;
      }
    },

    parseResponse(response) {
      if (!response.data || !response.data.entries) {
        this.error = true;
        return;
      }
      const entries = response.data.entries;
      if (entries.length == 0) {
        this.help = this.HELP_MESSAGES.NO_MATCH;
        return;
      }
      this.open = true;
      this.suggestions = entries;
    },

    reset() {
      this.error = false;
      this.help = null;
      this.query = '';
      this.searching = false;
      this.selection = null;
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
  },
  mixins: [
    clickaway
  ],
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
