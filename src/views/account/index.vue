<template>
  <div id="login">
    <img src="../../assets/images/logo/logo.png" width="240px" height="127px" alt="DIYC"/>
    <header>
      <div>
        <router-link tag="span" to="/account/login">登录</router-link>
        <div :class="loginClass" />
      </div>
      <div>
        <router-link tag="span" to="/account/register">注册</router-link>
        <div :class="registerClass" />
      </div>
    </header>
    <transition :name="transition" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      loginClass: null,
      registerClass: null,
      transition: null,
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
    switchTransition(routeName) {
      if (routeName === 'login') {
        this.transition = 'goRight';
      } else if (routeName === 'register') {
        this.transition = 'goLeft';
      }
    },
  },
  watch: {
    $route(to) {
      this.switchClass(to.name);
      this.switchTransition(to.name);
    },
  },
  created() {
    this.switchClass(this.$route.name);
    this.switchTransition(this.$route.name);
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
      width: 160px;
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
    /* 左-右进入 */
  .goLeft-enter-active{
    opacity: 0;
    transition: all .2s;
  }
  .goLeft-enter-to{
    opacity: 1;
  }

  /* 左-右渐出 */
  .goLeft-leave-active{
    transition: all .2s;
  }
  .goLeft-leave-to{
    opacity: 0;
  }
   /* 右-左进入 */
  .goRight-enter-active{
    opacity: 0;
    transition: all .2s;
  }
  .goRight-enter-to{
    opacity: 1;
  }
  /* 右-左渐出 */
  .goRight-leave-active{
    transition: all .2s;
  }
  .goRight-leave-to{
    opacity: 0;
  }
}
</style>
