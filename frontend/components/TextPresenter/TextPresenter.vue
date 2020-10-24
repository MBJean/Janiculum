<template>
  <div class="card card--full-mobile">

    <div class="card card--white">
      <div class="flex flex--apart cursor--pointer" @click="toggleNav">
        <p class="h--3 margin__bottom--none margin__top--none">Text navigator</p>
        <i class="material-icons">
          <template v-if="navOpen">keyboard_arrow_up</template>
          <template v-else>keyboard_arrow_down</template>
        </i>
      </div>
      <div v-if="navOpen">
        <slot name="nav" :getText="getText" :lastQuery="lastQuery" />
      </div>
    </div>

    <p v-if="error" class="card card--white margin__top--1">
      We apologize, something went wrong.
    </p>

    <p v-else-if="loading" class="card card--white margin__top--1">
      Loading...
    </p>

    <div v-else-if="xml" class="card card--white margin__top--1">
      <h3>
        <span v-if="lastQuery.book">Book {{ lastQuery.book }}</span>
        <span v-if="lastQuery.poem">, poem {{ lastQuery.poem }}</span>
        <span v-if="lastQuery.speech">Speech {{ lastQuery.speech }}</span>
        <span v-if="lastQuery.section">, section {{ lastQuery.section }}</span>
      </h3>
      <div
        v-html="sanitizedXML"
        @click="selectWord"
      />
    </div>

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
      lastQuery: {},
      loading: false,
      navOpen: true,
      xml: null
    };
  },
  computed: {
    sanitizedXML() {
      /*
      This method parses the XML string to reformat any self-closing tags
      (i.e., "<milestone />") into their expanded forms ("<milestone></milestone>").
      v-html is a wrapper around innerHTML, which doesn't allow for self-closing
      tags.
      */
      const splitBySelfClosingTags = this.xml.split("/>")
      return splitBySelfClosingTags.map(segment => {
        const lineByLine = segment.split("<")
        const lastElement = lineByLine[lineByLine.length - 1]
        const isLastElementWellFormatted = lastElement[lastElement.length - 1] == '>'
        if (isLastElementWellFormatted) return segment
        const lastElementName = lastElement.split(" ")[0]
        return `${segment}></${lastElementName}>`
      }).join('')
    },
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
        this.lastQuery = variables
        variables.author = this.author
        variables.title = this.title
        if (variables.book) variables.book = variables.book.toString()
        if (variables.poem) variables.poem = variables.poem.toString()
        if (variables.speech) variables.speech = variables.speech.toString()
        if (variables.section) variables.section = variables.section.toString()
        if (variables.chapter) variables.chapter = variables.chapter.toString()
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
      const s = window.getSelection();
      const range = s.getRangeAt(0);
      const node = s.anchorNode;
      while (range.startOffset !== 0) {
        range.setStart(node, range.startOffset - 1)
        if (range.toString().search(/\s/) === 0) {
          range.setStart(node, range.startOffset + 1);
          break;
        }
      }
      while (range.endOffset < node.length) {
        range.setEnd(node, range.endOffset + 1)
        if (range.toString().search(/[^a-z0-9]/gmi) !== -1) {
          range.setEnd(node, range.endOffset - 1);
          break;
        }
      }
      const str = range.toString()
                       .trim();
      console.log(str)
    },
    toggleNav() {
      this.navOpen = !this.navOpen
    }
  },
  mixins: [
  ],
}

</script>

<style lang="scss">
.text-present__selector {
  transition: transform 0.2s ease;
  &:not(.text-presenter__selector--active):hover {
    transform: scale(1.1);
  }
}
.text-presenter__selector--active {
  transform: scale(1.2);
}
</style>
