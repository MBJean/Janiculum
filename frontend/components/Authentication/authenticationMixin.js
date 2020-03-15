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
      this.email = event.target.value;
    },

    onChangeConfirmPassword(event) {
      this.confirmPassword = event.target.value;
    },

    onChangePassword(event) {
      this.password = event.target.value;
    },

  },
  computed: {
    validEmail() {
      return !emailValidator(this.email)
    },
    validationError() {
      return !this.email.length
        || !this.password.length
        || this.validEmail
        || this.password !== this.confirmPassword
    }
  }
}
