const Cookies = require('js-cookie')

export default function ({ app, store }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  const email = Cookies.get('janiculum-user')
  hasToken ? store.dispatch('base/login', { email }) : store.dispatch('base/logout')
}
