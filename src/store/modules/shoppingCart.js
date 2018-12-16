import * as cart from '@/api/shopping-cart';

const shoppingCart = {
  state: {
    shoppingCart: null,
  },
  mutations: {
    GET_SHOPPINGCART(state, data) {
      state.shoppingCart = data;
    },
  },
  actions: {
    getShoppingCart({ commit }, data) {
      console.log(data);
      commit('GET_SHOPPINGCART', data);
    },
  },
};

export default shoppingCart;
