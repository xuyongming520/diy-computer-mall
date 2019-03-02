<template>
  <div id="paid-order">
    <header>
      <span>已支付订单</span>
    </header>
  </div>
</template>

<script>
export default {
  name: 'paid-order',
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#paid-order{
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
}
</style>
