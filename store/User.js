import { Login, GetUserInfo } from '@/api/user'
import { setToken } from 'assets/utils/Cookies'
const state = () => ({
  Token: '',
  username: '',
  userId: '',
  status: '',
  role: ''
})

const mutations = {
  SET_TOKEN (state, data) {
    state.Token = data.Token
  },
  SET_USERINFO (state, data) {
    state.username = data.username
    state.userId = data.userId
    state.status = data.status
    state.role = data.role
  }
}

const actions = {
  nuxtServerInit ({ commit, state }, { req }) {
    if (req.headers.cookie) {
      const data = {
        Token: JSON.parse(req.headers.cookie)
      }
      commit('SET_TOKEN', data)
    }
  },
  async BlogLogin ({ commit }, params) {
    const { data } = await Login(params)
    if (data.status === 1) {
      commit('SET_TOKEN', data.data)
      setToken(data.data.token)
    }
  },
  async BlogUserInfo ({ commit }, params) {
    const { data } = await GetUserInfo(params)
    if (data.status === 1) {
      commit('SET_USERINFO', data.data)
    }
  }
}
export default {
  namespaced:true, // 命名空间
  state,
  actions,
  mutations
};
