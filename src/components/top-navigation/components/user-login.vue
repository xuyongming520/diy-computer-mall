<template>
  <div id="user-login">
    <div class="dropdown-link" v-if="Boolean(isLogin)">
      {{username | ellipsis}}<i class="el-icon-arrow-down el-icon--right"></i>
      <div class="user-menu">
        <el-button
          type="text"
          class="menu-button"
          v-for="(item,index) in menuList"
          :key="index"
          @click="item.methods"
        >
          {{item.name}}
        </el-button>
      </div>
    </div>

    <div id="login-register" v-else>
      <router-link tag="span" to="/account/login">登录</router-link>
      <router-link tag="span" to="/account/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'user-login',
  data() {
    return {
      menuList: [
        { name: '个人主页', methods: () => this.$router.push({ name: 'user' }) },
        { name: '购物车', methods: () => this.$router.push({ name: 'shoppingCartIndex' }) },
        { name: '我的收藏', methods: () => this.$router.push({ name: 'collectibles' }) },
        { name: '退出登录', methods: this.logout },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'username',
    ]),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ path: '/' });
        });
    },
  },
  filters: {
    ellipsis(string) {
      if (!string) return '';
      if (string.length > 6) {
        return `${string.slice(0, 6)}…`;
      }
      return string;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
#user-login{
  width: 140px;
  float: right;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #C0C4CC;
  background: @colorOne;
  position: relative;
  z-index: 1;
  box-shadow: -5px 0px 0px @colorOne;
  .dropdown-link{
    transition: all .25s;
    color: #C0C4CC;
    height: 40px;
    width:140px;
    font-size: 14px;
    text-align:center;
    position: relative;
    .user-menu{
      position:absolute;
      top: 40px;
      width:140px;
      height: 0px;
      overflow: hidden;
      background: white;
      transition: all .4s cubic-bezier(0.46, 0.39, 0.44, 0.83);
      box-shadow: 0px 0px 5px #888;
      z-index: -1;
      .menu-button{
        width: 140px;
        margin: 0;
      }
    }
    &:hover{
      background: white;
      color: @colorTwo;
      .user-menu{
        height: 160px;
      }
    }
  }
  #login-register{
    width: 140px;
    span{
      margin-left: 25px;
      transition: all .25s;
      &:hover{
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
