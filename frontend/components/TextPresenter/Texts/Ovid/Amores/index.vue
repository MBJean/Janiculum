<template>
  <div class="text-presentor__selector card">
    <p v-for="(poems, index) in [15, 19, 15]" class="margin__bottom--none">
      <button class="button button--secondary" @click="$emit('submit', { book: (index + 1).toString() })">
        Book {{ index + 1 }}:
      </button>
      <button
        v-if="index == 0"
        class="button button--secondary"
        @click="$emit('submit', { book: '1', poem: 'ep' })"
      >
        Prologue
      </button>
      <button
        v-for="poem in poems" :key="poem"
        class="button button--secondary"
        @click="$emit('submit', { book: (index + 1).toString(), poem: (poem).toString() })"
      >
        {{ poem }}
      </button>
    </p>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit('submit', { book: '1' })
  },
}
</script>
