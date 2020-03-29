<template>
  <div v-on-clickaway="close">

    <label class="form__toggle">
      <span class="form__toggle-text" :class="{'font--bold': !englishSelected}" aria-hidden="true">Latin</span>
      <input
        type="checkbox"
        name="generic"
        value="true"
        ref="input"
        class="form__toggle-input"
        aria-labelledby="generic-toggle-label"
        :checked="englishSelected"
        @change="toggleEnglishSelected"
      />
      <div class="form__toggle-bar" aria-hidden="true">
        <span class="form__toggle-ripple" />
        <span class="form__toggle-decoration" />
      </div>
      <span class="form__toggle-text" :class="{'font--bold': englishSelected}" aria-hidden="true">English</span>
    </label>

    <label class="form__container">
      <p v-if="englishSelected" class="form__label">Search for Latin stems using English</p>
      <p v-else class="form__label">Search Latin dictionary</p>
      <input
        v-if="englishSelected"
        class="form__input"
        :value="queryEnglish"
        @input="onChangeEnglish"
      />
      <input
        v-else
        class="form__input"
        :value="query"
        @input="onChange"
        @focus="onFocusLatin"
      />
    </label>

    <p v-if="searching" class="help help__searching">Searching...</p>
    <p v-else-if="error" class="help help__error">Sorry, an error occurred. Please try again</p>
    <p v-else-if="help" class="help help__base">{{ help }}</p>

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
      v-if="!englishSelected && selection"
      :body="selection.body"
    />

    <p v-if="englishSelected && stemSuggestions.length">
      <span class="font--bold">Possible stems:</span>
      <span v-for="(suggestion, index) in stemSuggestions">
        <button
          v-if="index < stemSuggestions.length - 1"
          class="button button--text"
          @click="selectStemSuggestion(suggestion)"
        >
          <span :class="{'margin__right--quarter': index < stemSuggestions.length - 2 }">
            {{ suggestion }}{{ index < stemSuggestions.length - 2 ? ', ': '' }}
          </span>
        </button>
      </span>
    </p>
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
      englishSelected: false,
      error: false,
      help: null,
      open: false,
      query: '',
      queryEnglish: '',
      searching: false,
      selection: null,
      stemSuggestions: [],
      suggestions: []
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
    }, 1000),

    onChangeEnglish: debounce(function(event) {
      const query = event.target.value;
      this.queryEnglish = query;
      this.searchEnglish();
    }, 1000),

    onClickSuggestion(suggestion) {
      this.close()
      this.englishSelected = false
      this.selection = suggestion
    },

    onFocusLatin() {
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

    parseStemsResponse(response) {
      if (!response.data || !response.data.senses) {
        this.error = true;
        return;
      }
      const stems = response.data.senses;
      if (stems.length == 0) {
        this.help = this.HELP_MESSAGES.NO_MATCH;
        return;
      }
      const flattenedStems = stems.map(stem => stem.body)
      const dedupedStems = [...new Set(flattenedStems)]
      this.stemSuggestions = dedupedStems
    },

    reset() {
      this.englishSelected = false
      this.error = false
      this.help = null
      this.query = ''
      this.searching = false
      this.selection = null
      this.stemSuggestions = []
      this.suggestions = []
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

    searchEnglish() {
      this.close()
      this.error = false
      this.searching = true
      this.stemSuggestions = []
      this.$apollo
        .query({
          query: QUERIES.STEM_SEARCH,
          variables: { query: this.queryEnglish },
        })
        .then(response => {
          this.help = null;
          this.parseStemsResponse(response)
        })
        .catch(error => {
          this.error = true;
        })
        .finally(() => {
          this.searching = false;
        })
    },

    selectStemSuggestion(suggestion) {
      this.query = suggestion
      this.searchDictionary()
    },

    toggleEnglishSelected() {
      this.englishSelected = !this.englishSelected
      if (this.englishSelected && this.queryEnglish) {
        this.searchEnglish()
      }
    }
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
.help {
  padding: $spacer-1;
}
.help__base {
  background-color: $color-primary-1-3;
}
.help__error {
  background-color: $color-secondary-1-4;
}
.help__searching {
  background-color: $color-primary-1-3;
}
</style>
