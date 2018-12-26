<template>
  <div id="search-page">
    <searchBar />

    <section id="bread-crumb">
      <el-breadcrumb separator="/" class="bread-crumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="$route.path">全部结果</el-breadcrumb-item>
        <el-breadcrumb-item :to="$route.path">{{$route.path.split('/')[2]}}</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="class-select">
      <div class="class-select">
        <div class="title">分类：</div>
        <div class="detail">
          <div
            v-for="(item,index) in classList"
            :key="index"
            :class="item.key===$route.query.classId?'select':null"
            @click="handleClassClick(item.key)"
          >
            {{item.name}}
          </div>
        </div>
      </div>
    </section>

    <section id="search-sort">
      <div class="search-sort">
        <div class="order-by">
          <div
            v-for="(item,index) in orderByList"
            :key="index"
            :class="
              (item.orderBy===listQuery.orderBy && item.desc===listQuery.desc)
              ? ['button','select']
              : 'button'
            "
            :style="index===0 ? 'border-left:0px;padding-left:0px;' : null"
            @click="handleSortClick(item.orderBy,item.desc)"
          >
            {{item.name}}
          </div>
        </div>
        <div class="between-price">
          <el-input v-model="listQuery.price1" placeholder="价格1" size="mini" class="input" /> -
          <el-input v-model="listQuery.price2" placeholder="价格2" size="mini" class="input" />
          <el-button type="primary" size="mini" class="button" @click="handlePriceCalc">确定</el-button>
        </div>
      </div>
    </section>

    <section id="search-result" v-loading="loading">
      <div class="search-result" v-if="productsList.length!==0">
        <div
          v-for="(item,index) in productsList"
          :key="index"
          class="product-card"
        >
          <img :src="item.image" width="200px" height="200px" class="image">
          <div class="name">{{item.name}}</div>
          <div class="price">{{item.price}}</div>
        </div>
      </div>
      <div class="no-result" v-else>
        无相关搜索结果！
      </div>
    </section>

    <section id="pagination">
      <el-pagination
        v-show="totalCount>0"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        :page-count="totalPage"
        layout="prev, pager, next, jumper"
        class="pagination"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </section>
  </div>
</template>

<script>
import searchBar from '@/components/search-bar/index.vue';
import * as products from '@/api/products';

export default {
  name: 'search-page',
  data() {
    return {
      productsList: [],
      totalCount: 0,
      totalPage: 0,
      loading: true,
      listQuery: {
        classId: null,
        name: null,
        limit: 16,
        page: 1,
        orderBy: null,
        desc: null,
        price1: null,
        price2: null,
      },
      classList: [
        { key: undefined, name: '全部', router: undefined },
        { key: '1', name: '机箱', router: 'chassis' },
        { key: '2', name: 'CPU', router: 'cpu' },
        { key: '3', name: '散热器', router: 'sink' },
        { key: '4', name: '显卡', router: 'graphics' },
        { key: '5', name: '机械硬盘', router: 'mechanical' },
        { key: '6', name: '显示器', router: 'monitor' },
        { key: '7', name: '主板', router: 'board' },
        { key: '8', name: '电源', router: 'power' },
        { key: '9', name: '内存', router: 'ram' },
        { key: '10', name: '固态硬盘', router: 'ssd' },
      ],
      orderByList: [
        { name: '综合', orderBy: null, desc: null },
        { name: '性能分', orderBy: 'score', desc: 'desc' },
        { name: '销售量', orderBy: 'sales_number', desc: 'desc' },
        { name: '上市时间', orderBy: 'pk_id', desc: 'desc' },
        { name: '价格从高到低', orderBy: 'price', desc: 'desc' },
        { name: '价格从低到高', orderBy: 'price', desc: 'asc' },
      ],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      this.listQuery.name = this.$route.params.keyWord;
      this.listQuery.classId = this.$route.query.classId;
      products.query(this.listQuery)
        .then((res) => {
          switch (res.data.code) {
            case 1:
              this.productsList = res.data.data.list;
              this.totalCount = res.data.data.totalCount;
              this.totalPage = res.data.data.totalPage;
              this.loading = false;
              break;
            case 0:
              this.productsList = [];
              this.totalCount = 0;
              this.totalPage = 0;
              this.loading = false;
              break;
            default:
              break;
          }
        });
    },
    handleClassClick(key) {
      if (key !== this.$route.query.classId) {
        if (key === undefined) {
          this.$router.push({ path: `/search/${this.listQuery.name}` });
        } else {
          this.$router.push({ path: `/search/${this.listQuery.name}`, query: { classId: key } });
        }
      }
    },
    handleSortClick(orderBy, desc) {
      this.listQuery.orderBy = orderBy;
      this.listQuery.desc = desc;
      this.getList();
    },
    handlePriceCalc() {
      if (this.listQuery.price1 > 0 && this.listQuery.price2 > 0 && this.listQuery.price1 < this.listQuery.price2) {
        [this.listQuery.price1, this.listQuery.price2] = [this.listQuery.price2, this.listQuery.price1];
      }
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
  },
  watch: {
    $route() {
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  components: {
    searchBar,
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#search-page{

  #bread-crumb{
    width: 100%;
    height: 15px;
    padding:20px 0;
    background: @backMain;
    .bread-crumb{
      width: @mainWidth;
      margin: 0px auto;
    }
  }

  #class-select{
    width: 100%;
    background: white;
    .class-select{
      width: @mainWidth;
      margin: 0px auto;
      padding:20px 0;
      .title{
        width: 90px;
        font-size: 15px;
        color: @fontTwo;
        float: left;
        height: 30px;
        line-height: 30px;
      }
      .detail{
        display: flex;
        flex-wrap:wrap;
        justify-content:flex-start;
        div{
          width:223px;
          height: 30px;
          line-height: 30px;
          color: @fontTwo;
          transition: all .3s;
          &:hover{
            color:@colorTwo;
            cursor: pointer;
          }
        }
        .select{
          color:@colorTwo;
          font-weight: bold;
        }
      }
    }
  }

  #search-sort{
    width: 100%;
    padding:10px 0;
    background: @backMain;
    .search-sort{
      width: @mainWidth;
      margin: 0px auto;
      height: 40px;
      .order-by{
        float: left;
        color: @fontTwo;
        .button{
          float: left;
          margin-top:10px;
          height: 20px;
          padding:0 20px;
          font-size: 14px;
          border-left: 1px solid @fontFour;
          transition: all .3s;
          &:hover{
            color:@colorTwo;
            cursor: pointer;
          }
        }
        .select{
          color:@colorTwo;
          font-weight: bold;
        }
      }
      .between-price{
        float: right;
        .input{
          margin-top:10px;
          width:100px;
          display: inline-block;
        }
        .button{
          margin-left: 10px;
        }
      }
    }
  }

  #search-result{
    width: 100%;
    min-height: 480px;
    background: @backMain;
    .no-result{
      line-height:450px;
      text-align:center;
      font-size:28px;
      color:@fontThree;
    }
    .search-result{
      width: @mainWidth;
      margin: 0px auto;
      display: flex;
      flex-wrap:wrap;
      justify-content:flex-start;
      .product-card{
        width:292px;
        height:420px;
        background:white;
        transition: all .4s;
        margin:6px;
        &:hover{
          box-shadow:0px 2px 10px #888;
        }
        .image{
          padding:46px;
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
      }
    }
  }

  #pagination{
    background:@backMain;
    .pagination{
      width:@mainWidth;
      margin:0 auto;
      padding:20px;
    }
  }
}
</style>
