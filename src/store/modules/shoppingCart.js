import * as cart from '@/api/shopping-cart';

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
    getShoppingCart({ commit }) {
      return new Promise((resolve, reject) => {
        cart.query()
          .then((res) => {
            switch (String(res.data.code)) {
              case '1':
                commit('GET_SHOPPINGCART', res.data.data);
                resolve();
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    },
    deleteProductById({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        cart.deleteById(id)
          .then((res) => {
            switch (String(res.data.code)) {
              case '1':
                dispatch('getShoppingCart');
                resolve(res);
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    cleanShoppingCart({ commit }) {
      commit('CLEAN_SHOPPINGCART');
    },
  },
};

export default shoppingCart;
