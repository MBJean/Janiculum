<template>
  <div class="layout__body">
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back {{ email }}. Functionality coming soon.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      email: state => state.base.email
    })
  },
  middleware: ['require-authentication']
}
</script>

<style lang="scss" scoped="true">
h1 {
  margin-bottom: $spacer-3;
}
</style>
