<template>
  <div id="user-login">
    <el-dropdown v-if="Boolean(isLogin)">
      <div class="el-dropdown-link">
        {{username | ellipsis}}<i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人主页</el-dropdown-item>
        <el-dropdown-item>购物车</el-dropdown-item>
        <el-dropdown-item>我的收藏</el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout()">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

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
  computed: {
    ...mapGetters([
      'isLogin',
      'username',
    ]),
  },
  methods: {
    async logout() {
      await sessionStorage.clear();
      await this.$store.dispatch('setIsLogin');
      await this.$store.dispatch('setUsername');
      await this.$store.dispatch('cleanShoppingCart');
      this.$router.push({ path: '/' });
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
  float: right;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #C0C4CC;
  .el-dropdown-link{
    transition: all .25s;
    color: #C0C4CC;
    height: 100%;
    width:120px;
    font-size: 12px;
    text-align:center;
    &:hover{
      background: white;
      color: @BLUE;
    }
  }
  #login-register{
    margin-right: 20px;
    span{
      margin-left: 20px;
      transition: all .25s;
      &:hover{
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
