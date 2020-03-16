<template>
  <div class="layout__body">
    <div>
      <h1>Sign Up</h1>
      <p>Sign up for an account to create vocabulary lists and notes.</p>
      <br/>
      <AuthenticationSignUp />
    </div>
  </div>
</template>

<script>
import AuthenticationSignUp from '~/components/Authentication/AuthenticationSignUp'

export default {
  components: {
    AuthenticationSignUp
  }
}
</script>
