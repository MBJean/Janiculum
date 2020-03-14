<template>
  <div class="layout__body">
    <div>
      <h1>Sign In</h1>
      <form class="card" @submit.prevent>
        <label class="form__container">
          <p class="form__label">Email</p>
          <input
            class="form__input"
            :value="email"
            @input="onChangeEmail"
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

    onChangeEmail: debounce(function(event) {
      this.email = event.target.value;
      this.errorFormat = !emailValidator(event.target.value);
    }, 500),

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
        .then(response => {
          console.log('success!');
          this.$store.commit('base/setAuthenticated', true);
        })
        .catch(error => {
          console.log(error);
          this.$store.commit('base/setAuthenticated', false);
        })
        .finally(() => {
          this.activeXHR = false;
        })
    }

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
