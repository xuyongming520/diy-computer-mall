<template>
  <div id="user-dashboard">
    <section id="user-info">
      <img
        src="@/assets/images/avator/default-avator.png"
        width="160px"
        height="160px"
      />

      <div id="main-info">
        <p class="name">{{userInfo.name}}</p>
        <p class="hello">{{sayHello}}</p>
        <router-link tag="p" to="/user/info" class="link">修改个人信息></router-link>
      </div>

      <div id="right-info">
        <p>个人签名：{{userInfo.personalProfile}}</p>
        <p>绑定邮箱：{{userInfo.email}}</p>
        <p>绑定手机：{{userInfo.ukPhone}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import * as users from '@/api/users';

export default {
  name: 'UserDashboard',
  data() {
    return {
      userInfo: {
        name: null,
        personalProfile: null,
        email: null,
        ukPhone: null,
      },
    };
  },
  computed: {
    sayHello() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour <= 10) {
        return '早上好！';
      }
      if (hour >= 11 && hour <= 17) {
        return '下午好！';
      }
      return '晚上好！';
    },
  },
  created() {
    users.userInfo()
      .then((res) => {
        this.userInfo = res.data.users;
      });
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#user-dashboard{
  width: 890px;

  #user-info{
    width: 100%;
    overflow: hidden;
    padding-bottom: 15px;
    border-bottom: 1px solid @border;
    img{
      border-radius: 50%;
      border:1px solid gray;
      padding:2px;
      float: left;
    }

    #main-info{
      width: 250px;
      height: 166px;
      padding: 0 20px;
      float: left;
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name{
        font-size: 28px;
        color: @fontOne;
      }
      .hello{
        font-size: 14px;
        color: @fontTwo;
      }
      .link{
        font-size: 12px;
        color: @colorTwo;
        cursor: pointer;
      }
    }

    #right-info{
      width: 380px;
      height:166px;
      float: left;
      padding-top: 22px;
      font-size: 14px;
      p{
        color: @fontTwo;
        margin: 14px 0;
      }
    }
  }
}
</style>
