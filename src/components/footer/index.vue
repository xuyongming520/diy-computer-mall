<template>
  <div id="footer">
    <div class="footer">
      <a href="https://github.com/yingpengsha/diy-computer-mall" target="_blank"><img src="../../assets/images/logo/logo.png" height="100px" alt="DIYC"/></a>
      <div class="power-by">
        &copy;Power By FEARLESS Studio <a href="https://github.com/yingpengsha" target="_blank">yingpengsha</a> & <a href="https://github.com/caohangwei1314" target="_blank">caohangwei</a> & <a href="https://github.com/xuyongming520" target="_blank">xuyongming</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
};
</script>

<style lang="less" scoped>
@import url("../../styles/number.less");
@import url("../../styles/color.less");
#footer{
  width: 100%;
  background: white;
  height: 150px;
  .footer{
    width:@mainWidth;
    margin:0 auto;
    height: 150px;
    line-height: 150px;
    position: relative;
    img{
      position:absolute;
      top: 25px;
      left: 519px;
    }
    .power-by{
      height: 150px;
      line-height: 150px;
      position:absolute;
      left: 710px;
      font-size: 12px;
    }
    a{
      color: @colorTwo;
    }
  }
}
</style>
