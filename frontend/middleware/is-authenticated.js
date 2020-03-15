export default function ({app, error}) {
  const hasToken = !!app.$apolloHelpers.getToken()
  return hasToken;
}
