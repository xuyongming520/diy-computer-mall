import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/account/index'),
      children: [
        {
          path: '/account/login',
          name: 'login',
          component: () => import('@/views/account/login'),
        },
        {
          path: '/account/register',
          name: 'register',
          component: () => import('@/views/account/register'),
        },
      ],
    },
  ],
});
