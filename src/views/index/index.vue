<template>
  <div id="index">
    <searchBar />
    <div id="carousel">
      <el-carousel :interval="5000" height="440px" arrow="always">
        <el-carousel-item v-for="item in carouselList" :key="item.src">
          <img :src="item.src" >
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import searchBar from '@/components/search-bar/index.vue';

import Image1 from '@/assets/images/index/aocAio721.png';
import Image2 from '@/assets/images/index/GTX1080Ti.png';
import Image3 from '@/assets/images/index/intelCorei9.png';
import Image4 from '@/assets/images/index/WDBLACKNVMESSD.png';

export default {
  name: 'index',
  data() {
    return {
      carouselList: [
        { src: Image1 },
        { src: Image2 },
        { src: Image3 },
        { src: Image4 },
      ],
    };
  },
  components: {
    searchBar,
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#index{

  #carousel{
    width: @mainWidth;
    margin: 0 auto;
    position: relative;
    z-index: 0;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 440px;
      margin: 0;
      text-align:center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
}
</style>
