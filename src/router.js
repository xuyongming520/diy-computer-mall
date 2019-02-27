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
      redirect: '/user/dashboard',
      component: () => import('@/views/user'),
      children: [
        {
          path: '/user/dashboard',
          name: 'userDashboard',
          component: () => import('@/views/user/dashboard'),
        },
        {
          path: '/user/shoppingCart',
          name: 'shoppingCartIndex',
          component: () => import('@/views/user/shopping-cart'),
        },
      ],
    },
    {
      path: '/account',
      name: 'account',
      redirect: '/account/login',
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
    {
      path: '/search/:keyWord',
      name: 'search',
      component: () => import('@/views/search/index'),
    },
    {
      path: '/product/CPU/:productId',
      name: 'CPU',
      component: () => import('@/views/product/cpu'),
    },
    {
      path: '/product/board/:productId',
      name: 'board',
      component: () => import('@/views/product/board'),
    },
    {
      path: '/product/chassis/:productId',
      name: 'chassis',
      component: () => import('@/views/product/chassis'),
    },
    {
      path: '/product/graphics/:productId',
      name: 'graphics',
      component: () => import('@/views/product/graphics'),
    },
    {
      path: '/product/mechanical/:productId',
      name: 'mechanical',
      component: () => import('@/views/product/mechanical'),
    },
    {
      path: '/product/monitor/:productId',
      name: 'monitor',
      component: () => import('@/views/product/monitor'),
    },
    {
      path: '/product/power/:productId',
      name: 'power',
      component: () => import('@/views/product/power'),
    },
    {
      path: '/product/RAM/:productId',
      name: 'RAM',
      component: () => import('@/views/product/ram'),
    },
    {
      path: '/product/sink/:productId',
      name: 'sink',
      component: () => import('@/views/product/sink'),
    },
    {
      path: '/product/SSD/:productId',
      name: 'SSD',
      component: () => import('@/views/product/ssd'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
