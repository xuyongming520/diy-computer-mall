<template>
  <div id="user-info">
    <header>
      <span>个人信息</span>
    </header>
    <img
      src="@/assets/images/avator/default-avator.png"
      width="160px"
      height="160px"
    />
    <main>
      <el-form ref="form" :rules="rules" :model="userInfo" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="签名" prop="personalProfile">
          <el-input v-model="userInfo.personalProfile"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="ukPhone">
          <el-input v-model.number="userInfo.ukPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="updateInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
import * as users from '@/api/users';

export default {
  name: 'user-info',
  data() {
    return {
      loading: true,
      userInfo: {},
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            type: 'number', message: '请输入正确的手机号码', trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    getInfo() {
      this.loading = true;
      users.userInfo()
        .then((result) => {
          this.userInfo = result.data.users;
          this.$store.commit('SET_USERNAME', this.userInfo.name);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updateInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await users.updateUserInfo(this.userInfo)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '修改信息成功！',
                type: 'success',
              });
              this.getInfo();
            }).catch(() => {
              this.$notify({
                title: '失败',
                message: '修改信息失败。',
                type: 'fail',
              });
            });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#user-info{
  width: 890px;
  header{
    line-height: 80px;
    border-bottom: 1px solid @fontThree;
    margin-bottom: 30px;
    span{
      color: @fontTwo;
      font-size: 30px;
      letter-spacing: 2px;
    }
  }

  img{
    border-radius: 50%;
    border:1px solid gray;
    padding:2px;
    float: left;
    margin: 30px;
    display: block;
  }

  main{
    float: left;
    margin-top: 20px;
    .el-form{
      width:500px;
    }
  }
}
</style>
