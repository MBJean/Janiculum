<template>
  <aside class="toolkit" v-on-clickaway="close">
    <div class="align--right">
      <button class="button" @click="close">
        <i class="material-icons">close</i>
      </button>
    </div>
    <div class="buttons">
      <button
        class="button"
        :class="{'button--active': selected === OPTIONS.SEARCH}"
        @click="select(OPTIONS.SEARCH)"
      >
        <i class="material-icons">library_books</i>
        <span>Dictionary</span>
      </button>
      <button
        class="button"
        :class="{'button--active': selected === OPTIONS.VOCABULARY}"
        @click="select(OPTIONS.VOCABULARY)"
      >
        <i class="material-icons">format_list_bulleted</i>
        <span>Vocabulary</span>
      </button>
      <button
        class="button"
        :class="{'button--active': selected === OPTIONS.NOTES}"
        @click="select(OPTIONS.NOTES)"
      >
        <i class="material-icons">notes</i>
        <span>Notes</span>
      </button>
    </div>

    <transition name="animate-fade">
      <ToolkitSearch v-if="selected === OPTIONS.SEARCH" />
      <ToolkitVocabularyList v-else-if="selected === OPTIONS.VOCABULARY" />
      <ToolkitNotes v-else-if="selected === OPTIONS.NOTES" />
    </transition>
  </aside>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import ToolkitSearch from '~/components/Toolkit/ToolkitSearch.vue';
import ToolkitVocabularyList from '~/components/Toolkit/ToolkitVocabularyList.vue';
import ToolkitNotes from '~/components/Toolkit/ToolkitNotes.vue';

const OPTIONS = {
  SEARCH: 'search',
  VOCABULARY: 'vocabulary',
  NOTES: 'notes'
};

export default {
  components: {
    ToolkitSearch,
    ToolkitVocabularyList,
    ToolkitNotes
  },
  data() {
    return {
      selected: OPTIONS.SEARCH
    };
  },
  methods: {
    close() {
      this.$store.dispatch('base/toggleToolkit')
    },
    select(option) {
      this.selected = option;
    },
  },
  computed: {
    OPTIONS() {
      return OPTIONS;
    }
  },
  mixins: [
    clickaway
  ],
}

</script>

<style lang="scss" scoped="true">
.toolkit {
  background-color: $color-primary-1-4;
  box-shadow: $box-shadow-standard;
  height: 100vh;
  max-width: calc(100% - 4rem);
  overflow-y: scroll;
  padding: $spacer-1;
  position: fixed;
  right: 0;
  width: 90%;
  z-index: 100;
  @include min-breakpoint(tablet) {
    width: 30%;
  }
}
.toolkit__inner {

}
.buttons {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-bottom: $spacer-2;
}
button {
  border-bottom: 0.25rem transparent solid;
  flex: 1;
  max-width: 33%;
  padding: $spacer-1 0;
  transition: border-bottom 0.2s ease;
  :nth-child(2) {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.button--active {
  border-bottom: 0.25rem $color-primary-1-2 solid;
}
@keyframes aside-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
</style>
