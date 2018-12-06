import * as token from '@/utils/auth';
import * as username from '@/utils/username';

const login = {
  state: {
    isLogin: !!token.getToken(),
    username: token.getToken() ? username.getName() : null,
  },
  mutations: {
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    REFRESH_ISLOGIN(state) {
      state.isLogin = !!token.getToken();
    },
    SET_USERNAME(state, name) {
      state.username = name;
    },
    REFRESH_USERNAME(state) {
      state.username = username.getName();
    },
  },
  actions: {
    setIsLogin({ commit }, isLogin) {
      commit('SET_ISLOGIN', isLogin);
    },
    refreshIsLogin({ commit }) {
      commit('REFRESH_ISLOGIN');
    },
    setUsername({ commit }, name) {
      commit('SET_USERNAME', name);
    },
    refreshUsername({ commit }) {
      commit('REFRESH_USERNAME');
    },
  },
};

export default login;
