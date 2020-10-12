<template>
  <div>
    <TextPresenterOvidAmores @submit="getText" />
    <p v-if="error">We apologize, something went wrong.</p>
    <p v-else-if="loading">Loading...</p>
    <div
      v-else-if="xml"
      v-html="xml"
      class="text-presenter__body"
    ></div>
  </div>
</template>

<script>
import QUERIES from '~/graphql/queries'
import TextPresenterOvidAmores from './Texts/Ovid/Amores/index'

export default {
  components: {
    TextPresenterOvidAmores
  },
  props: {
    author: { type: String, required: true },
    title: { type: String, required: true }
  },
  data() {
    return {
      error: false,
      loading: false,
      xml: null
    };
  },
  methods: {
    async getText({ book, poem }) {
      this.loading = true;
      this.error = false;
      try {
        const query = QUERIES.GET_TEXT
        const variables = { author: this.author, title: this.title, book: book, poem: poem }
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
  },
  computed: {
  },
  mixins: [
  ],
}

</script>

<style lang="scss">
.text-presentor__selector {
}

.text-presenter__body {
  margin: 2rem 0;
}
</style>
