<template>
  <div id="shopping-cart">
    <div id="header" @mouseover="getList">
      <svg-icon
        :icon-class="shoppingCartIsNull ? 'shopping-cart-empty' : 'shopping-cart-fill'"
        class-name="icon"
      />
      <span>购物车</span>
    </div>
    <div id="shopping-cart-list">
      <div class="cart-is-empty" v-if="shoppingCartIsNull" v-loading="loading">
        购物车中还没有商品，赶紧选购吧！
      </div>
      <div class="cart-is-full" v-else v-loading="loading">
        <div class="products-list">
          <div
            v-for="(item,index) in shoppingCart"
            :key="item.pkId"
            class="product-item"
            :style="index>0?'border-top:1px solid #C0C4CC':null"
          >
            <img :src="item.image" width="70px" height="70px" style="margin:5px;float:left"/>
            <div class="item-info">
              <div class="item-name">
                {{item.name | ellipsis}}
              </div>
              <div class="item-price">
                {{item.price+' × '+item.number | ellipsis}}
              </div>
            </div>
            <el-button
              type="text"
              class="delete-icon"
              @click="deleteProduct(item.pkId)"
            >
              <svg-icon
                icon-class="delete"
              />
            </el-button>
          </div>
        </div>
        <div class="calc-session">
          <div class="cart-info">
            <div class="cart-number">
              共 {{shopingCartInfo.number}} 件商品
            </div>
            <div class="cart-price">
              {{shopingCartInfo.price}}
              <span style="font-size:14px;">&nbsp;元</span>
            </div>
          </div>
          <el-button
            type="primary"
            class="button"
            @click="handleToShoppingCart()"
          >
            去购物车结算
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO:获取购物车的逻辑调整，是否有必要牺牲性能去提高用户体验。
import { mapGetters } from 'vuex';

export default {
  name: 'shopping-cart',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters([
      'shoppingCart',
      'shoppingCartIsNull',
    ]),
    shopingCartInfo() {
      const info = {
        number: 0,
        price: 0,
      };
      if (this.$store.getters.shoppingCart) {
        this.$store.getters.shoppingCart.forEach((value) => {
          info.number += value.number;
          info.price += value.number * value.price;
        });
      }
      return info;
    },
  },
  methods: {
    deleteProduct(id) {
      this.loading = true;
      this.$store.dispatch('deleteProductById', id)
        .then(() => { this.loading = false; })
        .catch(() => { this.loading = false; });
    },
    getList() {
      if (this.$store.getters.isLogin) {
        this.$store.dispatch('getShoppingCart')
          .then(() => { this.loading = false; })
          .catch(() => { this.loading = false; });
      } else {
        this.loading = false;
      }
    },
    handleToShoppingCart() {
      this.$router.push({ path: '/user/shoppingCart' });
    },
  },
  filters: {
    ellipsis(string) {
      if (!string) return '';
      if (string.length > 10) {
        return `${string.slice(0, 10)}…`;
      }
      return string;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
#shopping-cart{
  float: right;
  height: 100%;
  width: 140px;
  position: relative;
  z-index: -2;
  &:hover{
    #header{
    background: white;
    color: @colorTwo;
    cursor: pointer;
    }
    #shopping-cart-list{
      transform: translateY(0);
      box-shadow: 0px 0px 5px #888;
    }
  }
  #header{
    height: 100%;
    width: 140px;
    background: @colorTwo;
    text-align:center;
    transition: all .3s cubic-bezier(0.46, 0.39, 0.44, 0.83);
    color: white;
    z-index: auto;
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
    width: 280px;
    min-height: 120px;
    background: white;
    transition: all .3s cubic-bezier(0.46, 0.39, 0.44, 0.83);
    transform: translateY(-100%);
    .cart-is-empty{
      line-height: 110px;
      color: @fontTwo;
      font-size: 14px;
      text-align: center;
      z-index: -1;
    }
    .cart-is-full{
      z-index: -1;
      position: relative;
      padding-top: 5px;
      .products-list{
        max-height: 400px;
        overflow:auto;
        .product-item{
          min-width: 120px;
          margin: 0 10px;
          height: 80px;
          font-size:13px;
          color:@fontOne;
          .item-info{
            width:130px;
            float:left;
            height: 40px;
            margin-top: 21px;
            margin-left: 8px;
            .item-name{
              line-height: 20px;
              color: @colorTwo;
              font-weight: bold;
            }
            .item-price{
              line-height: 20px;
            }
          }
          .delete-icon{
            margin-top: 17px;
            font-size: 22px;
          }
        }
      }
      .calc-session{
        width:260px;
        height: 50px;
        padding:10px;
        background: @backMain;
        .cart-info{
          float:left;
          margin-left: 5px;
          margin-top: 2px;
          .cart-number{
            height: 18px;
            line-height:18px;
            font-size: 12px;
            color: black;
          }
          .cart-price{
            height: 30px;
            line-height:30px;
            font-size: 20px;
            color: @colorTwo;
          }
        }
        .button{
          margin:5px;
          float: right;
        }
      }
    }
  }
}
</style>
