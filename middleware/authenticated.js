export default function ({ store, req }) {
  // If the user is not authenticated
  let Token
  if (req && req.headers && req.headers.cookie) {
    Token = JSON.parse(req.headers.cookie)
    const data = {
      Token
    }
    store.commit('SET_TOKEN', data)
    return store.dispatch('BlogUserInfo', store.state().userId)
  }
}
