<template>
  <div id="index">
    <header>
      <img src="../../assets/images/logo/logo.png" height="100px" alt="DIYC" style="float:left"/>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择" class="select-list">
            <el-option
              v-for="item in selectList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" class="search-button">搜索</el-button>
        </el-input>
      </div>
    </header>

    <div id="carousel">
      <el-carousel :interval="5000" height="440px" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      input: '',
      select: '',
      selectList: [
        { name: '主板', value: 1 },
        { name: '显卡', value: 2 },
        { name: 'CPU', value: 3 },
        { name: '内存', value: 4 },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#index{
  width: @mainWidth;
  margin: 0 auto;
  header{
    width: 100%;
    height: 100px;
    margin: 10px 0px;
    line-height: 100px;
    .search{
      width: 650px;
      margin: 0px auto;
      .input-with-select{
        width: 650px;
        .select-list{
          min-width: 100px;
        }
        .search-button{
          background: @colorTwo;
          color: white;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border: 1px solid @colorTwo;
        }
      }
    }
  }

  #carousel{
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
