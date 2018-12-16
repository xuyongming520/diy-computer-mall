import Vue from 'vue';
import Vuex from 'vuex';

import userInfo from './modules/userInfo';
import shoppingCart from './modules/shoppingCart';

import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo,
    shoppingCart,
  },
  getters,
});
