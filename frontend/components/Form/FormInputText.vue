<template>
  <label class="form__container">
    <p class="form__label">{{ labelText }}</p>
    <input
      class="form__input"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('onChange', $event.target.value)"
      @focus="$emit('onFocus')"
    />
  </label>
</template>

<script>
export default {
  props: {
    labelText: String,
    placeholder: String,
    value: String,
  },
}
</script>
