export default function ({ store, req }) {
  // If the user is not authenticated
  if (req && req.headers && req.headers.cookie) {
    const Token = req.headers.cookie.split('=')[1]
    store.commit('User/SET_TOKEN', Token);
  }
}
