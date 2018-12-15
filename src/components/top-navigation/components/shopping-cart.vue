<template>
  <div id="shopping-cart">
    购物车
  </div>
</template>

<script>
export default {
  name: 'shopping-cart',
};
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
#shopping-cart{
  float: right;
  height: 100%;
  width: 120px;
  background: @colorTwo;
  text-align:center;
  transition: all .3s;
  color: white;
  position: relative;
  &:hover{
    background: white;
    color: @BLUE;
    cursor: pointer;
  }
}
</style>
