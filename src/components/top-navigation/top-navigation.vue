<template>
  <div id="top-navigation">
    <main>
      <LeftMenu :menu="menu" />
      <ShoppingCart />
      <UserLogin />
    </main>
  </div>
</template>

<script>
import LeftMenu from './components/left-menu.vue';
import UserLogin from './components/user-login.vue';
import ShoppingCart from './components/shopping-cart.vue';

export default {
  name: 'top-navigation',
  data() {
    return {
      menu: [
        { name: 'DIY商城', path: '/' },
        { name: 'DIY商城', path: '/' },
        { name: 'DIY商城', path: '/' },
        { name: 'DIY商城', path: '/' },
        { name: 'DIY商城', path: '/' },
        { name: 'DIY商城', path: '/' },
      ],
    };
  },
  components: {
    LeftMenu,
    UserLogin,
    ShoppingCart,
  },
};
</script>

<style lang="less" scoped>
@import url("../../styles/number.less");
@import url("../../styles/color.less");
@height:40px;
#top-navigation{
  width:100%;
  height: @height;
  background: @colorOne;
  color: #C0C4CC;
  line-height: @height;
  main{
    width: @mainWidth;
    margin:0 auto;
    position: relative;
  }
}
</style>
