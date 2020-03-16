<template>
  <div class="layout__body">
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back {{ email }}.</p>
      <p>Dashboard functionality coming soon.</p>
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
