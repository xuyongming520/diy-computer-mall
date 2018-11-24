<template>
  <div id="shoping-car">
    购物车
  </div>
</template>

<script>
export default {
  name: 'shoping-car',
};
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
#shoping-car{
  float: right;
  height: 100%;
  width: 120px;
  background: rgb(61, 100, 136);
  text-align:center;
  transition: all .3s;
  &:hover{
    background: white;
    color: @BLUE;
    cursor: pointer;
  }
}
</style>
