<template>
  <div id="user">
    <SearchBar />

    <section id="bread-crumb">
      <el-breadcrumb separator="/" class="bread-crumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="$route.path">{{breadcrumbName[$route.path]}}</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="main">
      <main>
        <div id="leftMenu">
          <div class="menuItem" v-for="(item,index) in leftMenu" :key="index">
            <span class="head">{{item.head}}</span>
            <router-link
              tag="span"
              :class="itemClass(info.path)"
              :to="info.path"
              v-for="(info,key) in item.menu"
              :key="key"
            >
              {{info.title}}
            </router-link>
          </div>
        </div>

        <div id="detail">
          <router-view></router-view>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import SearchBar from '@/components/search-bar/index.vue';

export default {
  name: 'user',
  data() {
    return {
      breadcrumbName: {
        '/user/dashboard': '我的个人中心',
        '/user/shoppingCart': '购物车',
      },
      leftMenu: [
        {
          head: '个人中心',
          menu: [
            { title: '我的个人中心', path: '/user/dashboard' },
            { title: '购物车', path: '/user/shoppingCart' },
            { title: '我的钱包', path: '/' },
            { title: '收货地址', path: '/' },
            { title: '收藏的商品', path: '/' },
          ],
        },
        {
          head: '账户管理',
          menu: [
            { title: '个人信息', path: '/' },
            { title: '修改密码', path: '/' },
          ],
        },
      ],
    };
  },
  computed: {
    itemClass() {
      return (path) => {
        if (path === this.$route.path) {
          return ['item', 'focus'];
        }
        return ['item'];
      };
    },
  },
  components: {
    SearchBar,
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#user{

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

  #main{
    width: 100%;
    background: @backMain;
    main{
      width: @mainWidth;
      margin: 0px auto;
      padding-bottom: 20px;
      overflow: auto;
      #leftMenu{
        float: left;
        width: 160px;
        height: 700px;
        background: white;
        padding:40px;
        .menuItem{
          span{
            display: block;
          }
          .head{
            font-size: 20px;
            padding: 15px 0;
            padding-bottom: 20px;
            color: black;
          }
          .item{
            font-size: 15px;
            color: gray;
            padding-bottom: 12px;
          }
          .focus{
            color: @colorTwo;
            font-weight: bold;
          }
          .item:hover{
            cursor: pointer;
          }
        }
      }

      #detail{
        width: 890px;
        background: white;
        margin-left: 16px;
        float: right;
        padding: 40px;
        padding-top: 55px;
      }
    }
  }
}
</style>
