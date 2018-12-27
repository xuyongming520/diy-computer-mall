<template>
  <div id="detailed-parameters">
    <div class="table" v-for="(item,index) in infoFormat" :key="index">
      <header>{{item.title}}</header>
      <div class="detail" v-for="(info,key) in item.info" :key="key">
        <div class="title">
          {{info.name}}
        </div>
        <div class="detail">
          {{productInfo[info.key] || '无'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailed-parameters',
  props: {
    productInfo: {
      type: Object,
      required: true,
    },
    infoFormat: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../../../styles/number.less');
@import url('../../../styles/color.less');
#detailed-parameters{
  width: calc(100% - 60px);
  min-height: 400px;
  margin: 30px;
  .table{
    width:100%;
    header{
      width: calc(100% - 40px);
      height: 50px;
      background: @backMain;
      line-height: 50px;
      padding: 0 20px;
      font-size: 18px;
      font-weight: bold;
    }
    .detail{
      display:block;
      width:100%;
      height: 40px;
      div{
        display: inline-block;
        line-height: 40px;
        border:2px solid @backMain;
        border-top: 0px;
      }
      .title{
        width: 130px;
        border-right: 0px;
        padding-left: 20px;
        color: @fontOne;
      }
      .detail{
        width: 990px;
        padding-left: 20px;
        color: @fontThree;
      }
    }
  }
}
</style>
