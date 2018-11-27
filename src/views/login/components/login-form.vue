<template>
  <div id="login-form">
    <header>
      用户登录
    </header>
    <main>
      <input
        type="text"
        id="username"
        placeholder="邮箱"
        v-model="username"
        :class="errorClass"
        ref="username"
        v-focus
      />
      <input
        type="password"
        id="password"
        placeholder="密码"
        v-model="password"
        :class="errorClass"
        @keyup.enter="login()"
      />
      <div id="message">
        {{message}}
      </div>
      <div id="submit" @click="login()">
        登录
      </div>
    </main>
  </div>
</template>

<script>
import * as users from '@/api/users';
import * as auth from '@/utils/auth';
import * as name from '@/utils/username';
import service from '@/utils/request';

export default {
  name: 'login-form',
  data() {
    return {
      username: null,
      password: null,
      message: null,
      errorClass: null,
    };
  },
  methods: {
    login() {
      users.login(this.username, this.password).then(async (res) => {
        switch (res.data.code) {
          case '0':
            this.message = '账号或密码错误';
            this.errorClass = 'error';
            this.password = '';
            this.$refs.username.focus();
            break;
          case '1':
            await auth.setToken(res.data.token);
            await this.$store.dispatch('refreshIsLogin');
            await console.log(service);
            await name.setName();
            this.$router.push({ path: '/' });
            break;
          default:
            break;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
#login-form{
  width: 400px;
  height: 520px;
  margin: 34px 0px;
  float: right;
  background: white;
  border-radius: 3px;
}
header{
  margin-top: 20px;
  height: 80px;
  line-height: 80px;
  font-size: 25px;
  text-align: center;
}
input{
  display: block;
  margin:20px auto 10px auto;
  padding:10px;
  width: 320px;
  height: 25px;
  outline: none;
  border: 1px solid @border;
  border-radius: 3px;
  &.error{
    border-color: @danger;
  }
}
#message{
  margin: 0 auto;
  width: 344px;
  height: 15px;
  text-align: right;
  font-size: 12px;
  color: @danger;
}
#submit{
  margin:15px auto 0 auto;
  padding:10px;
  width: 324px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  color:white;
  background: @colorTwo;
  border-radius: 3px;
}
</style>
