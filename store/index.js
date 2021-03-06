// import { GetUserInfo } from '@/api/user';
export const actions = {
  nuxtServerInit ({ commit, state, dispatch }, { req }) {
    if (req.headers.cookie) {
      // commit('User/SET_TOKEN', req.headers.cookie)
      // const { data } = GetUserInfo();
      // console.log(data);
    }
  }
};
