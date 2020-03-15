<template>
  <div class="layout__body">
    <div>
      <h1>Sign Up</h1>
      <p>Sign up for an account to create vocabulary lists and notes.</p>
      <br/>
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
        <label class="form__container">
          <p class="form__label">Confirm Password</p>
          <input
            class="form__input"
            type="password"
            :value="confirmPassword"
            @input="onChangeConfirmPassword"
            @blur="onBlurConfirmPassword"
          />
          <p v-if="errorConfirmPassword" class="form__help">Passwords do not match</p>
        </label>
        <div class="align--right">
          <input
            type="submit"
            class="button button--primary"
            value="Sign up"
            :disabled="validationError"
            @click="submit"
          />
        </div>
        <p v-if="errorCredentials">User already exists. <br/> Please sign in or again.</p>
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
      confirmPassword: '',
      email: '',
      errorConfirmPassword: false,
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

    onBlurConfirmPassword() {
      this.errorConfirmPassword = this.password !== this.confirmPassword
    },

    onBlurEmail() {
      this.errorFormat = !emailValidator(this.email)
    },

    onChangeEmail(event) {
      this.email = event.target.value
    },

    onChangeConfirmPassword(event) {
      this.confirmPassword = event.target.value
    },

    onChangePassword(event) {
      this.password = event.target.value
    },

    submit() {
      if (this.validationError) return
      this.activeXHR = true
      this.errorCredentials = false
      this.$apollo
        .mutate({
          mutation: MUTATIONS.CREATE_USER,
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
            email: data.createUser.email,
            token: data.createUser.token
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
        || !emailValidator(this.email)
        || this.password !== this.confirmPassword
    }
  }
}
</script>

<style lang="scss" scoped="true">
h1 {
  margin-bottom: $spacer-3;
}
</style>
