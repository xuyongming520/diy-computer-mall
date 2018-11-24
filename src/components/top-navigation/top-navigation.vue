<template>
  <div id="top-navigation">
    <main>
      <LeftMenu :menu="menu" />
      <ShopingCar />
    </main>
  </div>
</template>

<script>
import LeftMenu from './components/left-menu.vue';
import ShopingCar from './components/shoping-car.vue';

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
    ShopingCar,
  },
};
</script>

<style lang="less" scoped>
@import url("../../styles/number.less");
@height:40px;
#top-navigation{
  width:100%;
  height: @height;
  background: #344A5F;
  color: #C0C4CC;
  line-height: @height;
}
main{
  width: @mainWidth;
  margin:0 auto;
  position: relative;
}
</style>
