<template>
  <div id="login">
    <header>
    </header>
    <div id="background">
      <main>
        <login-form />
      </main>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/login-form.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
  },
};
</script>

<style lang="less" scoped>
@import url("../../styles/number.less");
#login{
  width: 100%
}
header{
  width: @mainWidth;
  margin: 0 auto;
  height: 100px;
  // border:1px solid black;
}
#background{
  width:100%;
  height: 588px;
  background-image: url("../../assets/images/login/homeoffice-business-commerce.jpg");
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
}
main{
  width:@mainWidth;
  height: 100%;
  margin: 0 auto;
}
</style>
