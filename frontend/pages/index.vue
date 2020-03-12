<template>
  <div class="layout__body">
    <div>

      <template v-if="visibleEntry">
        <h1 class="h--2">{{ visibleEntry.lemma }}</h1>
        <EntryBase :body="visibleEntry.body" />
      </template>

      <template v-else>
        <h1>Janiculum</h1>
        <h2>A Latin Learning Application</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend id diam vitae fermentum. Maecenas ligula ex, convallis ac diam vitae, volutpat suscipit turpis. Praesent fringilla nulla eu ex volutpat imperdiet.</p>
      </template>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EntryBase from '~/components/Entry/EntryBase.vue'

export default {
  components: {
    EntryBase
  },
  computed: {
    ...mapState({
      visibleEntry: state => state.base.visibleEntry
    }),
  },
}
</script>
