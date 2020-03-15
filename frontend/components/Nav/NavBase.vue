<template>
  <nav class="layout__nav" role="navigation" aria-label="main navigation">
    <nuxt-link to="/">
      <img src="~/assets/images/logo.png">
    </nuxt-link>
    <ul v-if="auth">
      <li>
        <nuxt-link to="/dashboard" class="button button--nav">Dashboard</nuxt-link>
      </li>
      <li>
        <button class="button button--nav" @click="logout">Log out</button>
      </li>
    </ul>
    <ul v-else>
      <li>
        <nuxt-link to="/sign-in" class="button button--nav">Sign in</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/sign-up" class="button button--nav">Sign up</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      auth: state => state.base.auth
    }),
  },
  methods: {
    async logout() {
      this.$apolloHelpers
        .onLogout()
        .then(response => {
          this.$store.dispatch('base/logout')
          this.$router.push('/')
        })
    }
  }
}
</script>

<style lang="scss" scoped="true">
nav {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
ul {
  display: flex;
}
li {
  margin: 0 0.5rem;
}
li:last-child {
  margin-right: 0;
}
img {
  height: $spacer-3;
  width: auto;
}
</style>
