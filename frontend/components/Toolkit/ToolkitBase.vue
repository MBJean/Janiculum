<template>
  <aside class="layout__toolkit">
    <div class="buttons">
      <button
        class="button"
        :class="{'button--active': selected === OPTIONS.SEARCH}"
        @click="select(OPTIONS.SEARCH)"
      >
        <i class="material-icons">search</i>
        <span>Dictionary</span>
      </button>
      <button
        class="button"
        :class="{'button--active': selected === OPTIONS.VOCABULARY}"
        @click="select(OPTIONS.VOCABULARY)"
      >
        <i class="material-icons">format_list_bulleted</i>
        <span>Vocab</span>
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
    select(option) {
      this.selected = option;
    },
  },
  computed: {
    OPTIONS() {
      return OPTIONS;
    }
  }
}

</script>

<style lang="scss" scoped="true">
aside {
  background-color: $color-primary-1-4;
  box-shadow: $box-shadow-standard;
  @include min-breakpoint(mobileLarge) {
    // animation: aside-in 0.5s ease;
    padding-top: $spacer-7;
  }
}
.buttons {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-bottom: $spacer-2;
}
button {
  border-bottom: 0.25rem transparent solid;
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
