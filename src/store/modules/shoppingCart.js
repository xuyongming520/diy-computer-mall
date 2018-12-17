
const shoppingCart = {
  state: {
    shoppingCart: null,
  },
  mutations: {
    GET_SHOPPINGCART(state, data) {
      state.shoppingCart = data;
    },
    CLEAN_SHOPPINGCART(state) {
      state.shoppingCart = null;
    },
  },
  actions: {
    getShoppingCart({ commit }, data) {
      commit('GET_SHOPPINGCART', data);
    },
    cleanShoppingCart({ commit }) {
      commit('CLEAN_SHOPPINGCART');
    },
  },
};

export default shoppingCart;
