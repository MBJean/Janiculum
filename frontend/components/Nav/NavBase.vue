<template>
  <nav class="layout__nav" role="navigation" aria-label="main navigation">
    <nuxt-link to="/">
      <img src="~/assets/images/logo.png">
    </nuxt-link>
    <ul>
      <li v-if="auth">
        <nuxt-link to="/dashboard" class="button button--nav">Dashboard</nuxt-link>
      </li>
      <li v-if="auth">
        <button class="button button--nav" @click="logout">Log out</button>
      </li>
      <li v-if="!auth">
        <nuxt-link to="/sign-in" class="button button--nav">Sign in</nuxt-link>
      </li>
      <li v-if="!auth">
        <nuxt-link to="/sign-up" class="button button--nav">Sign up</nuxt-link>
      </li>
      <li class="nav__spacer">
        <span>|</span>
      </li>
      <li>
        <button class="button button--nav" @click="openToolkit">
          <i class="material-icons">build</i>
          <span><span class="nav__toggle-text">Toggle</span> Toolkit</span>
        </button>
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
    },
    openToolkit() {
      this.$store.dispatch('base/toggleToolkit')
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
  align-items: center;
  display: flex;
}
li {
  margin: 0;
  @include min-breakpoint(tablet) {
    margin: 0 0.5rem;
  }
}
li:last-child {
  margin-right: 0;
}
img {
  height: $spacer-3;
  width: auto;
}
.nav__spacer {
  display: none;
  @include min-breakpoint(tablet) {
    display: inline-block;
  }
}
.nav__toggle-text {
  display: none;
  @include min-breakpoint(tablet) {
    display: inline;
  }
}
</style>
