<template>
  <div id="comments-list" v-loading="loading">
    <header>
      <span>综合评价</span>
      <el-rate
        v-model="avgScore"
        disabled
        show-score
        text-color="#ff9900"
        disabled-void-color="white"
        class="rate">
      </el-rate>
    </header>
    <div v-if="commentsList.length!==0">
      <div class="comment" v-for="(item,index) in commentsList" :key="index">
        <div class="title">
          {{item.userName}}
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#ff9900"
            disabled-void-color="white"
            class="rate">
          </el-rate>
        </div>
        <div class="detail">{{item.evaluation}}</div>
      </div>
    </div>
    <div class="no-comments" v-else><div>暂无评论！</div></div>
  </div>
</template>

<script>
import * as comments from '@/api/evaluation';

export default {
  name: 'comments-list',
  data() {
    return {
      loading: true,
      commentsList: [],
      avgScore: 0,
      listQuery: {
        limit: 15,
        page: 1,
        productsId: null,
        classId: null,
        orderBy: 'gmt_create',
        desc: 'desc',
      },
    };
  },
  props: {
    classId: {
      type: Number,
      required: true,
    },
    productsId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getComments() {
      this.listQuery.productsId = this.productsId;
      this.listQuery.classId = this.classId;
      this.loading = true;
      comments.query(this.listQuery)
        .then((res) => {
          this.loading = false;
          switch (res.data.code) {
            case 1:
              this.commentsList = res.data.data.list;
              this.commentsList.forEach((value) => {
                value.score /= 2;
              });
              this.avgScore = res.data.points / 2;
              break;
            default:
              break;
          }
        });
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style lang="less" scoped>
@import url('../../../styles/number.less');
@import url('../../../styles/color.less');
#comments-list{
  display: block;
  width: calc(100% - 60px);
  min-height: 400px;
  margin: 30px;
  header{
    width: calc(100% - 40px);
    height: 50px;
    background: @backMain;
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
    .rate{
      float: right;
      margin:16px;
      line-height: 12px;
    }
  }
  .comment{
    width: calc(100% - 4px);
    min-height: 150px;
    border:2px solid @backMain;
    border-top: 0px;
    .title{
      width: calc(100% - 40px);
      margin: 0 20px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      .rate{
        display: inline-block;
        line-height: 12px;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .detail{
      width: 1118px;
      margin: 0 20px;
      line-height: 30px;
      font-size: 18px;
      color: @fontThree;
    }
  }
  .no-comments{
    display: block;
    width: calc(100% - 4px);
    height: 150px;
    border:2px solid @backMain;
    border-top: 0px;
    line-height: 150px;
    font-size: 28px;
    color: @fontFour;
    div{
      margin:0 508px;
    }
  }
}
</style>
