export default function ({app, error}) {
  const hasToken = app.$apolloHelpers.getToken('session')
  console.log(hasToken)
}
