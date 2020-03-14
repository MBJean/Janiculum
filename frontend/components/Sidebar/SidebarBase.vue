<template>
  <aside class="layout__sidebar">
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
      <SidebarSearch
        v-if="selected === OPTIONS.SEARCH"
        @selectSuggestion="selectSuggestion"
      />
      <SidebarVocabularyList
        v-else-if="selected === OPTIONS.VOCABULARY"
      />
      <SidebarNotes
        v-else-if="selected === OPTIONS.NOTES"
      />
    </transition>
  </aside>
</template>

<script>
import SidebarSearch from '~/components/Sidebar/SidebarSearch.vue';
import SidebarVocabularyList from '~/components/Sidebar/SidebarVocabularyList.vue';
import SidebarNotes from '~/components/Sidebar/SidebarNotes.vue';

const OPTIONS = {
  SEARCH: 'search',
  VOCABULARY: 'vocabulary',
  NOTES: 'notes'
};

export default {
  components: {
    SidebarSearch,
    SidebarVocabularyList,
    SidebarNotes
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
    selectSuggestion(entry) {
      this.$store.commit('base/setVisibleEntry', entry);
    }
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
