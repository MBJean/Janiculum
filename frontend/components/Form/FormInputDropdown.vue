<template>
  <ol class="form__list">
    <li
      v-for="suggestion in suggestions"
      class="form__list-item"
      @click="$emit('onClick', suggestion)"
    >
      <div class="text--overflow">
        <span>{{ suggestion[suggestionProperty] }}</span>
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    suggestionProperty: String,
    suggestions: Array,
  },
}
</script>
