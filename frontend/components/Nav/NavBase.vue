<template>
  <nav class="layout__nav" role="navigation" aria-label="main navigation">
    <nuxt-link to="/">
      <img src="~/assets/images/logo.png">
    </nuxt-link>
    <ul v-if="authenticated">
      <li>
        <nuxt-link to="/logout">Log out</nuxt-link>
      </li>
    </ul>
    <ul v-else="authenticated">
      <li>
        <nuxt-link to="/sign-in">Sign in</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/sign-up">Sign up</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      authenticated: state => state.base.authenticated
    })
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
