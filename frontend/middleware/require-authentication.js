export default function ({app, error}) {
  const hasToken = !!app.$apolloHelpers.getToken()
  console.log(hasToken)
  if (!hasToken) {
      error({errorCode:503, message:'You are not allowed to see this'})
  }
}
