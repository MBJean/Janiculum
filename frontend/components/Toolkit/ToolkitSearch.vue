<template>
  <div v-on-clickaway="close">

    <FormInputToggle
      :label-left="'Latin'"
      :label-right="'English'"
      :toggled="englishSelected"
      @toggle="toggleEnglishSelected"
    />

    <FormInputText
      v-if="englishSelected"
      :label="'Search for Latin stems using English'"
      :placeholder="'ex. house'"
      :value="queryEnglish"
      @onChange="onChangeEnglish"
    />

    <FormInputText
      v-else
      :label="'Search Latin dictionary'"
      :placeholder="'ex. domus'"
      :value="query"
      @onChange="onChange"
      @onFocus="onFocusLatin"
    />

    <p v-if="searching" class="help help__searching">Searching...</p>
    <p v-else-if="error" class="help help__error">Sorry, an error occurred. Please try again</p>
    <p v-else-if="help" class="help help__base">{{ help }}</p>

    <FormInputDropdown
      v-else-if="suggestions && suggestions.length && open"
      :suggestions="suggestions"
      :suggestion-property="'orthography'"
      @onClick="onClickSuggestion"
    />

    <EntryBase
      v-if="!englishSelected && selection"
      :body="selection.body"
    />

    <EntryStems
      v-else-if="englishSelected && stemSuggestions.length"
      :suggestions="stemSuggestions"
      @onSelect="selectStemSuggestion"
    />
  </div>
</template>

<script>
import QUERIES from '~/graphql/queries'
import * as debounce from 'lodash.debounce'
import EntryBase from '~/components/Entry/EntryBase.vue'
import EntryStems from '~/components/Entry/EntryStems.vue'
import FormInputDropdown from '~/components/Form/FormInputDropdown.vue'
import FormInputText from '~/components/Form/FormInputText.vue'
import FormInputToggle from '~/components/Form/FormInputToggle.vue'
import { mixin as clickaway } from 'vue-clickaway';

const HELP_MESSAGES = {
  NO_MATCH: 'No match, please search again.'
}

export default {
  components: {
    EntryBase,
    EntryStems,
    FormInputDropdown,
    FormInputText,
    FormInputToggle,
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

    onChange: debounce(function(value) {
      this.query = value;
      this.searchDictionary();
    }, 1000),

    onChangeEnglish: debounce(function(value) {
      this.queryEnglish = value;
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
