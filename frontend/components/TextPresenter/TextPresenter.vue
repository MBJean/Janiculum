<template>
  <div class="card">
    <slot :getText="getText">
    </slot>
    <p v-if="error" class="card card--white margin__top--1">
      We apologize, something went wrong.
    </p>
    <p v-else-if="loading" class="card card--white margin__top--1">
      Loading...
    </p>
    <div
      v-else-if="xml"
      v-html="xml"
      class="card card--white margin__top--1"
      @click="selectWord"
    />
  </div>
</template>

<script>
import QUERIES from '~/graphql/queries'

export default {
  props: {
    author: { type: String, required: true },
    initialQuery: { type: Object, required: false },
    title: { type: String, required: true },
  },
  data() {
    return {
      error: false,
      loading: false,
      xml: null
    };
  },
  created() {
    if (!this.initialQuery) return
    this.getText(this.initialQuery)
  },
  methods: {
    async getText(variables) {
      this.loading = true;
      this.error = false;
      try {
        variables.author = this.author
        variables.title = this.title
        if (variables.book) variables.book = variables.book.toString()
        if (variables.poem) variables.poem = variables.poem.toString()
        const query = QUERIES.GET_TEXT
        const params = { query, variables }
        const response = await this.$apollo.query(params)
        const texts = response.data.texts
        if (texts.errors) throw new Error(texts.errors)
        this.xml = texts.xml
      } catch(errors) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    selectWord(event) {
      console.log(event)
    }
  },
  computed: {
  },
  mixins: [
  ],
}

</script>
