<template>
  <div id="shopping-cart">
    <div id="header">
      <svg-icon
        :icon-class="shopingCartIsNull ? 'shopping-cart-empty' : 'shopping-cart-fill'"
        class-name="icon"
      />
      <span>购物车</span>
    </div>
    <div id="shopping-cart-list">
      <div class="cart-is-empty" v-if="shopingCartIsNull">
        购物车中还没有商品，赶紧选购吧！
      </div>
      <div v-else>
        购物车列表
      </div>
    </div>
  </div>
</template>

<script>
import * as cart from '@/api/shopping-cart';
import { mapGetters } from 'vuex';

export default {
  name: 'shopping-cart',
  computed: {
    ...mapGetters([
      'shoppingCart',
    ]),
    shopingCartIsNull() {
      if (this.$store.getters.shoppingCart) {
        return !this.$store.getters.shoppingCart[0];
      }
      return !this.$store.getters.shoppingCart;
    },
  },
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
  position: relative;
  z-index: 2;
  &:hover{
    #header{
    background: white;
    color: @BLUE;
    cursor: pointer;
    }
    #shopping-cart-list{
      height: 119px;
    }
  }
  #header{
    height: 100%;
    width: 120px;
    background: @colorTwo;
    text-align:center;
    transition: all .3s;
    color: white;
    z-index: 1;
    .icon{
      font-size: 19px;
      position: relative;
      right: 1px;
      margin-right: 2px;
    }
  }
  #shopping-cart-list{
    position:absolute;
    z-index: -1;
    right: 0px;
    min-width: 280px;
    height: 0px;
    background: white;
    box-shadow: 0px 0px 5px #888;
    transition: all .3s;
    overflow: hidden;
    .cart-is-empty{
      line-height: 110px;
      color: @fontTwo;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
