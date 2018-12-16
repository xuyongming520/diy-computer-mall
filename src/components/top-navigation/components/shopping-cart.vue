<template>
  <div id="shopping-cart">
    购物车
  </div>
</template>

<script>
import * as cart from '@/api/shopping-cart';

export default {
  name: 'shopping-cart',
  methods: {
    getShoppingCart() {
      cart.query()
        .then((res) => {
          switch (String(res.data.code)) {
            case '1':
              this.$store.dispatch('getShoppingCart', res.data.data);
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    if (this.$store.getters.isLogin) {
      this.getShoppingCart();
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
#shopping-cart{
  float: right;
  height: 100%;
  width: 120px;
  background: @colorTwo;
  text-align:center;
  transition: all .3s;
  color: white;
  position: relative;
  &:hover{
    background: white;
    color: @BLUE;
    cursor: pointer;
  }
}
</style>
