<template>
  <div id="change-password">
    <header>
      <span>修改密码</span>
    </header>

    <main>
      <el-form ref="form" :rules="rules" :model="passwordList" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword" required>
          <el-input type="password" v-model="passwordList.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" required>
          <el-input type="password" v-model="passwordList.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" required>
          <el-input type="password" v-model="passwordList.checkPassword"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="updatePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
import * as users from '@/api/users';

export default {
  name: 'change-password',
  data() {
    const oldPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (this.passwordIsRight === false) {
        callback(new Error('请输入正确密码'));
      } else {
        callback();
      }
    };
    const newPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordList.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword');
        }
        callback();
      }
    };
    const checkPasswordRule = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordList.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passwordList: {
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
      },
      passwordIsRight: true,
      rules: {
        oldPassword: [{ validator: oldPasswordRule, trigger: 'blur' }],
        newPassword: [{ validator: newPasswordRule, trigger: 'blur' }],
        checkPassword: [{ validator: checkPasswordRule, trigger: 'blur' }],
      },
    };
  },
  methods: {
    updatePassword() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
        if (valid) {
          users.changePassword(this.passwordList.oldPassword, this.passwordList.newPassword)
            .then((result) => {
              console.log(result);
              switch (result.data.code) {
                case '0':
                  this.passwordIsRight = false;
                  this.$refs.form.validateField('oldPassword');
                  this.passwordIsRight = true;
                  break;
                case '1':
                  this.$notify({
                    title: '成功',
                    message: '修改密码成功！',
                    type: 'success',
                  });
                  this.$refs.form.resetFields();
                  break;
                default:
                  break;
              }
            }).catch(() => {
              this.$notify({
                title: '失败',
                message: '修改密码失败！',
                type: 'fail',
              });
            });
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#change-password{
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
  main{
    width:400px;
    margin:auto;
    margin-top: 30px;
  }
}
</style>
