<template>
  <div class="layout__body">
    <div>
      <h1>Sign In</h1>
      <p>Welcome back! Sign in to view your saved vocabulary lists and notes.</p>
      <br/>
      <form class="card" @submit.prevent>
        <label class="form__container">
          <p class="form__label">Email</p>
          <input
            class="form__input"
            :value="email"
            @input="onChangeEmail"
            @blur="onBlur"
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
    </div>
  </div>
</template>

<script>
import MUTATIONS from '~/graphql/mutations'
import * as debounce from 'lodash.debounce'
import emailValidator from '~/helpers/email-validator'

export default {
  data() {
    return {
      activeXHR: false,
      email: '',
      errorCredentials: false,
      errorFormat: false,
      password: '',
    }
  },
  methods: {

    handleResponse({ email, token }) {
      this.$apolloHelpers
        .onLogin(token)
        .then(response => {
          this.$store.dispatch('base/login', { email })
          this.$router.push('/dashboard')
        })
    },

    onBlur() {
      this.errorFormat = !emailValidator(this.email)
    },

    onChangeEmail(event) {
      this.email = event.target.value;
    },

    onChangePassword(event) {
      this.password = event.target.value;
    },

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
      return !this.email.length || !this.password.length || !emailValidator(this.email);
    }
  }
}
</script>

<style lang="scss" scoped="true">
h1 {
  margin-bottom: $spacer-3;
}
</style>
