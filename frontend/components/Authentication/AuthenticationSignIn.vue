<template>
  <form class="card" @submit.prevent>
    <label class="form__container">
      <p class="form__label">Email</p>
      <input
        class="form__input"
        :value="email"
        @input="onChangeEmail"
        @blur="onBlurEmail"
      />
      <p v-if="errorFormat" class="form__help">Please use a valid email format (example@test.com)</p>
    </label>
    <label class="form__container">
      <p class="form__label">Password</p>
      <input
        class="form__input"
        type="password"
        :value="password"
        @input="onChangePassword"
      />
    </label>
    <div class="align--right">
      <input
        type="submit"
        class="button button--primary"
        value="Sign in"
        :disabled="validationError"
        @click="submit"
      />
    </div>
    <p v-if="errorCredentials">Email and/or password do not match. <br/> Please try again.</p>
  </form>
</template>

<script>
import authenticationMixin from './authenticationMixin'
import MUTATIONS from '~/graphql/mutations'

export default {
  methods: {
    submit() {
      if (this.validationError) return;
      this.activeXHR = true;
      this.errorCredentials = false;
      this.$apollo
        .mutate({
          mutation: MUTATIONS.AUTHENTICATE_USER,
          variables: {
            email: this.email,
            password: this.password
          },
        })
        .then(({ data }) => {
          if (data.errors) {
            throw new Error(data.errors.message)
          }
          this.handleResponse({
            email: data.authenticateUser.email,
            token: data.authenticateUser.token
          })
        })
        .catch(error => {
          this.errorCredentials = true
        })
        .finally(() => {
          this.activeXHR = false
        })
    },
  },
  computed: {
    validationError() {
      return !this.email.length
        || !this.password.length
        || this.validEmail
    }
  },
  mixins: [authenticationMixin]
}
</script>

<style lang="scss" scoped="true">
form {
  max-width: 40rem;
}
</style>
