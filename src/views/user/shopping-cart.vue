<template>
  <div id="shopping-cart-index">
    <el-table
      ref="shoppingCart"
      :data="shoppingCart"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="商品" width="120" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            width="100"
            height="100"
            class="productRouter"
            @click="routerToProductDetail(scope.row.classId,scope.row.pkId)"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <span
            class="productRouter"
            @click="routerToProductDetail(scope.row.classId,scope.row.pkId)"
          >
            {{scope.row.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100" align="center">
        <template slot-scope="scope">
          <span class="singlePrice">{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="200" align="center">
        <template slot-scope="scope">
          <el-input-number
            size="small"
            v-model="scope.row.number"
            @change="updateProducts(scope.row.pkId,scope.row.number)"
          >
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计" width="100" align="center">
        <template slot-scope="scope">
          <span class="sumNumber">{{scope.row.price*scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteProduct(scope.row.pkId)"
            type="primary"
            icon="el-icon-delete"
            circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <section id="summaryBar">

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ShoppingCartIndex',
  data() {
    return {
      loading: true,
      selectProducts: [],
      classList: [
        { key: undefined, name: '全部', router: undefined },
        { key: '1', name: '机箱', router: 'chassis' },
        { key: '2', name: 'CPU', router: 'CPU' },
        { key: '3', name: '显卡', router: 'graphics' },
        { key: '4', name: '散热器', router: 'sink' },
        { key: '5', name: '机械硬盘', router: 'mechanical' },
        { key: '6', name: '显示器', router: 'monitor' },
        { key: '7', name: '主板', router: 'board' },
        { key: '8', name: '电源', router: 'power' },
        { key: '9', name: '内存', router: 'RAM' },
        { key: '10', name: '固态硬盘', router: 'SSD' },
      ],
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
    routerToProductDetail(classId, productId) {
      const routerPath = this.classList[classId].router;
      this.$router.push({ path: `/product/${routerPath}/${productId}` });
    },
    updateProducts(productId, number) {
      this.$store.dispatch('updateProducts', { productId, number })
        .then(() => { this.loading = false; })
        .catch(() => { this.loading = false; });
    },
    deleteProduct(id) {
      this.loading = true;
      this.$store.dispatch('deleteProductById', id)
        .then(() => {
          this.$notify({
            title: '删除成功',
            message: '已从购物车中删除。',
            type: 'success',
          });
          this.loading = false;
        })
        .catch(() => { this.loading = false; });
    },
    handleSelectionChange(list) {
      this.selectProducts = list;
    },
  },
  created() {
    this.$store.dispatch('getShoppingCart')
      .then(() => { this.loading = false; })
      .catch(() => { this.loading = false; });
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#shopping-cart-index{
  width: 890px;
  .productRouter{
    cursor: pointer;
  }
  .singlePrice{
    font-size: 16px;
  }
  .sumNumber{
    color: @colorTwo;
    font-weight: bold;
    font-size: 18px;
  }

  #summaryBar{
    width:100%;
    height:50px;
    margin-top:30px;
    border-bottom: 1px solid @colorOne;
  }
}
</style>
