<template>
  <div v-html="body">
  </div>
</template>

<script>
export default {
  props: {
    body: String
  }
}
</script>
