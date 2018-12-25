import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import './styles/public.scss';

import './icons';

Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app');
