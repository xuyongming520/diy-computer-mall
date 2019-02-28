<template>
  <div id="wallet">
    <header>我的钱包</header>
    <main>
      <p>可用余额:<span>{{money}}</span>&nbsp;元</p>
      <el-button
        type="primary"
        class="button"
        @click="dialogVisible = true"
      >
        充值
      </el-button>
    </main>

    <el-dialog
      title="充值"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div class="inputNumber">
        <el-input-number v-model="payMoney" :precision="2" :step="10" :min="0" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;payMoney = 0">取 消</el-button>
        <el-button type="primary" @click="payment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as users from '@/api/users';

export default {
  name: 'wallet',
  data() {
    return {
      money: 0,
      dialogVisible: false,
      payMoney: 0,
    };
  },
  methods: {
    getWallet() {
      users.wallet()
        .then((result) => {
          this.money = result.data.data;
        });
    },
    async payment() {
      await users.payment(this.payMoney)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '充值成功！',
            type: 'success',
          });
        });
      this.payMoney = 0;
      this.dialogVisible = false;
      this.getWallet();
    },
  },
  created() {
    this.getWallet();
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#wallet{
  width: 890px;
  header{
    color: @fontTwo;
    font-size: 30px;
    letter-spacing: 2px;
    line-height: 80px;
    border-bottom: 1px solid @fontThree;
  }
  main{
    height: 80px;
    line-height: 80px;
    padding-bottom: 30px;
    border-bottom: 1px solid @fontThree;
    p{
      color: @fontTwo;
      float: left;
      span{
        font-size:40px;
        color: @colorOne;
      }
    }
    .button{
      float: right;
      width: 90px;
      height: 40px;
      font-size: 16px;
      margin-top: 40px;
      margin-right: 30px;
    }
  }
  .inputNumber{
    width: 180px;
    margin: 0 auto;
  }
}
</style>
