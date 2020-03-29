<template>
  <label class="form__toggle">
    <span
      class="form__toggle-text"
      :class="{'font--bold': !toggled}"
      aria-hidden="true"
    >
      {{ labelLeft }}
    </span>
    <input
      type="checkbox"
      name="generic"
      value="true"
      ref="input"
      class="form__toggle-input"
      aria-labelledby="generic-toggle-label"
      :checked="toggled"
      @change="$emit('toggle')"
    />
    <div class="form__toggle-bar" aria-hidden="true">
      <span class="form__toggle-ripple" />
      <span class="form__toggle-decoration" />
    </div>
    <span
      class="form__toggle-text"
      :class="{'font--bold': toggled}"
      aria-hidden="true"
    >
      {{ labelRight }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    labelLeft: String,
    labelRight: String,
    toggled: Boolean,
  },
}
</script>
