<template>
  <div id="collectibles">
    <header>
      <span>收藏的商品</span>
    </header>

    <main v-loading="loading">
      <div
        class="product-card"
        v-for="(product,index) in productsList"
        :key="index"
      >
        <img
          :src="product.image"
          width="200px"
          height="200px"
          class="image"
          @click="routerToProductDetail(product.classId,product.pkId)"
        >
        <div class="name">{{product.name}}</div>
        <div class="price">{{product.price}}<span style="font-size:12px;">&nbsp;元</span></div>
        <el-button
          type="text"
          icon="el-icon-delete"
          class="cancelCollect"
          @click="cancelCollect(product.pkId)"
        >
        </el-button>
      </div>
    </main>

    <el-pagination
      v-show="totalPage>0"
      :current-page.sync="listQuery.page"
      :page-size="listQuery.limit"
      :page-count="totalPage"
      layout="prev, pager, next"
      style="margin-top:20px"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import * as collect from '@/api/collect';

export default {
  name: 'collectibles',
  data() {
    return {
      loading: true,
      productsList: [],
      totalCount: 0,
      totalPage: 0,
      listQuery: {
        limit: 9,
        page: 1,
      },
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
  methods: {
    getList() {
      this.loading = true;
      collect.query(this.listQuery)
        .then((result) => {
          this.productsList = result.data.data.list;
          this.totalCount = result.data.data.totalCount;
          this.totalPage = result.data.data.totalPage;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
    },
    async cancelCollect(productId) {
      console.log(productId);
      await collect.deleteCollect(productId)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '取消收藏成功！',
            type: 'success',
          });
        });
      this.getList();
    },
    routerToProductDetail(classId, productId) {
      const routerPath = this.classList[classId].router;
      this.$router.push({ path: `/product/${routerPath}/${productId}` });
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#collectibles{
  width: 890px;
  header{
    line-height: 80px;
    border-bottom: 1px solid @fontThree;
    margin-bottom: 30px;
    span{
      color: @fontTwo;
      font-size: 30px;
      letter-spacing: 2px;
    }
  }

  main{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .product-card{
      width:284px;
      height:380px;
      background:white;
      transition: all .4s;
      margin:4px;
      position: relative;
      &:hover{
        box-shadow:0px 2px 10px #888;
        .cancelCollect{
          opacity: 1;
        }
      }
      .image{
        padding:46px;
        padding-bottom:30px;
        &:hover{
          cursor: pointer;
        }
      }
      .name{
        font-size:14px;
        color:black;
        width:240px;
        height:40px;
        margin:0 auto;
        text-align:center;
      }
      .price{
        font-size:20px;
        color:@colorTwo;
        width:240px;
        margin:10px auto;
        text-align:center;
      }
      .cancelCollect{
        font-size: 20px;
        position:absolute;
        top: 5px;
        right: 15px;
        opacity: 0;
      }
    }
  }
}
</style>
