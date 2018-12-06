<template>
  <div id="login">
    <input
      type="text"
      id="email"
      placeholder="邮箱"
      v-model="email"
      :class="emailClass"
      ref="email"
      v-focus
    />
    <input
      type="password"
      id="password"
      placeholder="密码"
      v-model="password"
      :class="passwordClass"
      ref="password"
      @keyup.enter="login()"
    />
    <div id="message">
      {{message}}
    </div>
    <div id="submit" @click="login()">
      登录
    </div>
  </div>
</template>

<script>
import * as users from '@/api/users';
import * as auth from '@/utils/auth';
import * as format from '@/utils/format';
import * as name from '@/utils/username';

export default {
  name: 'login',
  data() {
    return {
      email: null,
      password: null,
      message: null,
      emailClass: null,
      passwordClass: null,
    };
  },
  methods: {
    login() {
      console.log(format.email(this.email));
      if (!this.email) {
        this.emailClass = 'error';
        this.message = '邮箱不能为空！';
        this.$refs.email.focus();
      } else if (!format.email(this.email)) {
        this.emailClass = 'error';
        this.message = '邮箱格式错误！';
        this.$refs.email.focus();
      } else if (!this.password) {
        this.passwordClass = 'error';
        this.message = '密码不能为空！';
        this.$refs.password.focus();
      } else {
        users.login(this.email, this.password)
          .then((res) => {
            switch (res.data.code) {
              case '0':
                this.message = '账号或密码错误';
                this.emailClass = 'error';
                this.passwordClass = 'error';
                this.password = '';
                this.$refs.email.focus();
                break;
              case '1':
                auth.setToken(res.data.token);
                this.$store.commit('SET_ISLOGIN', true);
                name.setName().then(() => {
                  this.$store.commit('SET_USERNAME', name.getName());
                });
                this.$router.push({ path: '/' });
                break;
              default:
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
@import url("../../styles/color.less");
#login{
  width: 400px;
  height: 520px;
  margin: 0 auto;
  background: white;
  border-radius: 3px;
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
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
