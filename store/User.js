import { Login } from '@/api/user';
import { setToken } from 'assets/utils/Cookies';
const state = () => ({
  Token: ''/*,
  username: '',
  userId: '',
  status: '',
  role: '' */
});

const mutations = {
  SET_TOKEN (state, Token) {
    state.Token = Token;
  }/*,
  SET_USERINFO (state, data) {
    state.username = data.username;
    state.userId = data.userId;
    state.status = data.status;
    state.role = data.role;
  } */
};

const actions = {
  async BlogLogin ({ commit }, params) {
    const { data } = await Login(params);
    if (data.status === 1) {
      commit('SET_TOKEN', data.value.token);
      setToken(data.value.token);
    }
    return data;
  }/*,
  async BlogUserInfo ({ commit }) {
    const { data } = await GetUserInfo();
    if (data.status === 1) {
      commit('SET_USERINFO', data.value);
    }
  } */
};
export default {
  namespace: true,
  state,
  actions,
  mutations
};
