export default function ({ store, redirect }) {
  // If the user is not authenticated
  const Token = store.state.User.Token;
  if (Token === '') {
    redirect('/')
  }
}
