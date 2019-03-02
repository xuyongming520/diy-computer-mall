<template>
  <div id="completed-order">
    <header>
      <span>已完成订单</span>
    </header>
  </div>
</template>

<script>
export default {
  name: 'completed-order',
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#completed-order{
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
