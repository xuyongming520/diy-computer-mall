<template>
  <div id="register">
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
    />
    <input
      type="password"
      id="repassword"
      placeholder="重复密码"
      v-model="repassword"
      :class="repasswordClass"
      ref="repassword"
      @keyup.enter="register()"
    />
    <div id="message">
      {{message}}
    </div>
    <div id="submit" @click="register()">
      注册
    </div>
  </div>
</template>

<script>
import * as users from '@/api/users';
import * as format from '@/utils/format';
import * as auth from '@/utils/auth';
import * as name from '@/utils/username';

export default {
  name: 'register',
  data() {
    return {
      email: null,
      password: null,
      repassword: null,
      message: null,

      emailClass: null,
      passwordClass: null,
      repasswordClass: null,
    };
  },
  methods: {
    register() {
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
      } else if (this.password !== this.repassword) {
        this.password = null;
        this.repassword = null;
        this.passwordClass = 'error';
        this.repasswordClass = 'error';
        this.message = '两次密码不同';
        this.$refs.password.focus();
      } else {
        users.register(this.email, this.password)
          .then((res) => {
            console.log(res);
            switch (res.data.code) {
              case '0':
                this.password = null;
                this.repassword = null;
                this.$refs.email.focus();
                this.emailClass = 'error';
                this.passwordClass = 'error';
                this.repasswordClass = 'error';
                this.$refs.email.focus();
                this.message = `${res.data.msg}！`;
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
            console.error(err);
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
@import url("../../styles/number.less");
@import url("../../styles/color.less");
#register{
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
