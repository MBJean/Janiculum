<template>
  <p>
    <span class="font--bold">Possible stems:</span>
    <span v-for="(suggestion, index) in suggestions">
      <button
        v-if="index < suggestions.length - 1"
        class="button button--text"
        @click="$emit('onSelect', suggestion)"
      >
        <span :class="{'margin__right--quarter': index < suggestions.length - 2 }">
          {{ suggestion }}{{ index < suggestions.length - 2 ? ', ': '' }}
        </span>
      </button>
    </span>
  </p>
</template>

<script>
export default {
  props: {
    suggestions: Array
  }
}
</script>
