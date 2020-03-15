<template>
  <div class="layout__body">
    <div>
      <h1>Sign In</h1>
      <p>Welcome back! Sign in to view your saved vocabulary lists and notes.</p>
      <br/>
      <AuthenticationSignIn />
    </div>
  </div>
</template>

<script>
import AuthenticationSignIn from '~/components/Authentication/AuthenticationSignIn'

export default {
  components: {
    AuthenticationSignIn
  }
}
</script>

<style lang="scss" scoped="true">
h1 {
  margin-bottom: $spacer-3;
}
</style>
