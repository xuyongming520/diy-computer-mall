<template>
  <div id="login">
    <img src="../../assets/images/logo/logo.png" width="240px" height="127px" alt="DIYC"/>
    <header>
      <div>
        <router-link tag="span" to="/user/login">登录</router-link>
        <div :class="loginClass" />
      </div>
      <div>
        <router-link tag="span" to="/user/register">注册</router-link>
        <div :class="registerClass" />
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      loginClass: null,
      registerClass: null,
    };
  },
  methods: {
    switchClass(routeName) {
      const el = `${routeName}Class`;
      if (el === 'loginClass') {
        this.loginClass = 'focus';
        this.registerClass = null;
      } else if (el === 'registerClass') {
        this.loginClass = null;
        this.registerClass = 'focus';
      }
    },
  },
  watch: {
    $route(to) {
      this.switchClass(to.name);
    },
  },
  created() {
    this.switchClass(this.$route.name);
  },
};
</script>

<style lang="less" scoped>
@import url("../../styles/number.less");
@import url("../../styles/color.less");
#login{
  width: 100%;
  img{
    display: block;
    margin: 100px auto 0 auto;
  }
  header{
    width: 320px;
    height: 50px;
    margin: 10px auto 0 auto;
    div{
      display: inline-block;
      text-align: center;
      width: 159.5px;
      span{
        display: block;
        letter-spacing:5px;
        &:hover{
          cursor: default;
        }
      }
      div{
        width: 0px;
        margin: 0 auto;
        transition: all .5s;
        border-bottom: 2px solid @colorTwo;
        color: @fontTwo;
      }
      .focus{
        width: 100px;
        span{
          font-weight: bold;
        }
      }
    }
  }
}
</style>
