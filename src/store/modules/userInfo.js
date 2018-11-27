import * as token from '@/utils/auth';
import * as username from '@/utils/username';

const login = {
  state: {
    isLogin: !!token.getToken(),
    username: token.getToken() ? username.getName() : null,
  },
  mutations: {
    REFRESH_ISLOGIN(state) {
      state.isLogin = !!token.getToken();
    },
  },
  actions: {
    refreshIsLogin({ commit }) {
      commit('REFRESH_ISLOGIN');
    },
  },
};

export default login;
