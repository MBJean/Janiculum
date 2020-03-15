export default function ({ store, redirect }) {
  const auth = store.state.base.auth
  if (!auth) {
      redirect('/')
  }
}
