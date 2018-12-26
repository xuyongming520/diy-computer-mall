import * as token from '@/utils/auth';
import * as username from '@/utils/username';
import * as shoppingCart from '@/utils/shoppingCart';
import * as users from '@/api/users';

const login = {
  state: {
    isLogin: !!token.getToken(),
    username: username.getName() ? username.getName() : null,
    shoppingCartIsNull: shoppingCart.getCart() ? shoppingCart.getCart() === '0' : true,
  },
  mutations: {
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_USERNAME(state, name) {
      state.username = name;
      username.setName(name);
    },
    SET_CART(state, cart) {
      state.shoppingCartIsNull = cart === '0';
      shoppingCart.setCart(cart);
    },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve) => {
        users.login(data.email, data.password)
          .then((res) => {
            switch (res.data.code) {
              case '0':
                resolve('0');
                break;
              case '1':
                token.setToken(res.data.token);
                commit('SET_ISLOGIN', true);
                commit('SET_USERNAME', res.data.name);
                commit('SET_CART', res.data.shoppingCart);
                resolve('1');
                break;
              default:
                break;
            }
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_ISLOGIN', false);
        commit('SET_USERNAME', null);
        commit('SET_CART', '0');
        sessionStorage.clear();
        resolve();
      });
    },
  },
};

export default login;
