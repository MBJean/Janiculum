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

<style lang="scss" scoped="true">
p {
  font-size: $font-size-5;
  line-height: 1.25;
  margin-bottom: $spacer-1;
  margin-top: $spacer-1;
}
</style>
