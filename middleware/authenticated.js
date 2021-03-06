export default function ({ store, req }) {
  // If the user is not authenticated
  if (req && req.headers && req.headers.cookie) {
    store.commit('User/SET_TOKEN', req.headers.cookie);
  }
}
