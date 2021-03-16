export const actions = {
  async nuxtServerInit({
    commit
  }, { req, app }) {
    if (req && req.headers && req.headers.cookie) {
      const { data } = await app.$axios.post('/user/getUserInfo')
      if (data.status === 1) {
        commit('User/SET_USERINFO', data.value.username)
      }
    }
  }
}
