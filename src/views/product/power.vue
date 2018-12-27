<template>
  <div id="cpu">
    <SearchBar />

    <section id="title">
      <div class="title">
        <div class="name">
          {{productInfo.name}}
        </div>
      </div>
    </section>

    <section id="main" v-loading="infoLoading">
      <main>
        <div class="image">
          <img :src="productInfo.image" width="450px" height="450px">
        </div>
        <div class="detail">

          <div class="title" ref="name">
            {{productInfo.name}}
          </div>

          <div class="performance">
            <div class="item" v-for="(item,index) in performance" :key="index">
              <svg-icon
                :icon-class="item.icon"
                class-name="icon"
              />
              <div class="info">
                <div v-for="(detail,key) in item.info" :key="key">
                  <b>{{detail.title}}：</b>{{productInfo[detail.detail] | ellipsis}}
                </div>
              </div>
            </div>
          </div>

          <div class="score">
            <div style="border-right:1px solid #909399">
              总销量：<span style="color:#4D78C4">{{evaluation}}</span>
            </div>
            <div>累计评价：<span style="color:#4D78C4">{{evaluation}}</span></div>
          </div>

          <div class="price">
            价格：<b>{{productInfo.price}}</b><span>元</span>
          </div>

          <div class="number">
            <span>数量：</span><el-input-number v-model="number" size="small" :min="1" :max="99"/>
          </div>

          <div class="buttons">
            <el-button type="primary" @click="handleInsertCart">加入购物车</el-button>
            <el-button type="danger" @click="handleLikeIt" v-loading="collectLoading">
              <svg-icon
                icon-class="heart"
                class-name="heart-icon"
              />
              {{collected?'已喜欢':'喜欢'}}
            </el-button>
          </div>
        </div>
      </main>
    </section>

    <section id="information">
      <div class="information">
        <div class="tabs">
          <div
            class="info"
            :style="select==='info'?'border-bottom:0;':null"
            @click="select='info'"
          >
            商品详情
          </div>
          <div
            class="comments"
            :style="select==='comments'?'border-bottom:0;':null"
            @click="select='comments'"
          >
            累计评价（{{evaluation}}）
          </div>
        </div>

        <div class="detail" v-loading="infoLoading">
          <Parameters :productInfo="productInfo" :infoFormat="infoFormat" v-if="select==='info'" />
          <CommentsList :classId="productInfo.classId" :productsId="productInfo.pkId" v-else/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SearchBar from '@/components/search-bar/index.vue';
import Parameters from './components/detailed-parameters.vue';
import CommentsList from './components/comments-list.vue';
import * as products from '@/api/products';
import * as collect from '@/api/collect';

export default {
  name: 'CPU',
  data() {
    return {
      productInfo: {},
      infoLoading: true,
      collectLoading: false,
      number: 1,
      select: 'info',
      evaluation: 0,
      salesNumber: 0,
      collected: false,
      infoFormat: [
        {
          title: '基本参数',
          info: [
            { key: 'type', name: '电源类型' },
            { key: 'scope', name: '使用范围' },
            { key: 'rate', name: '额定功率' },
            { key: 'description', name: '风扇描述' },
            { key: 'size', name: '电源尺寸' },
          ],
        },
        {
          title: '电源接口',
          info: [
            { key: 'motherboardInterface', name: '主板接口' },
            { key: 'cpuInterface', name: 'CPU接口' },
            { key: 'graphicsInterface', name: '显卡接口' },
            { key: 'hdType', name: '硬盘接口' },
            { key: 'powerInterface', name: '供电接口' },
          ],
        },
        {
          title: '性能参数',
          info: [
            { key: 'acInput', name: '交流接口' },
            { key: 'output', name: '12V输出电源' },
          ],
        },
      ],
      performance: [
        {
          icon: 'powerBox',
          info: [{ title: '电源类型', detail: 'type' }, { title: '出线类型', detail: '' }],
        },
        {
          icon: 'power',
          info: [{ title: '额定功率', detail: 'rate' }, { title: '最大功率', detail: '' }],
        },
        {
          icon: 'USB',
          info: [{ title: '主板接口', detail: 'motherboardInterface' }, { title: '硬盘接口', detail: 'hdType' }],
        },
      ],
    };
  },
  methods: {
    getInfo() {
      products.queryDetail(this.$route.params.productId)
        .then((res) => {
          this.productInfo = res.data.data;
          this.infoLoading = false;
          this.evaluation = res.data.evaluation;
          this.salesNumber = res.data.salesNumber;
        });
    },
    handleInsertCart() {
      if (this.$store.getters.isLogin) {
        this.$store.dispatch('insertProducts', { productId: this.$route.params.productId, number: this.number })
          .then(() => {
            this.$notify({
              title: '成功',
              message: '加入购物车成功！',
              type: 'success',
            });
          });
      } else {
        this.$message({
          message: '请先登录',
          type: 'warning',
        });
      }
    },
    async handleLikeIt() {
      this.collectLoading = true;
      if (this.collected) {
        await collect.deleteCollect(this.$route.params.productId);
        this.isCollected();
      } else {
        await collect.insert(this.$route.params.productId);
        this.isCollected();
      }
    },
    isCollected() {
      collect.isCollected(this.$route.params.productId)
        .then((res) => {
          this.collected = Boolean(res.data.code);
          this.collectLoading = false;
        });
    },
  },
  created() {
    this.getInfo();
    this.isCollected();
  },
  components: {
    SearchBar,
    Parameters,
    CommentsList,
  },
  filters: {
    ellipsis(string) {
      if (!string) return '';
      if (string.length > 10) {
        return `${string.slice(0, 10)}…`;
      }
      return string;
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#cpu{

  #title{
    width: 100%;
    height: 30px;
    padding: 15px 0;
    border-top: 1px solid @backOne;
    box-shadow: 0px 10px 8px #eee;
    .title{
      width: @mainWidth;
      margin: 0px auto;
      .name{
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        margin-left: 20px;
      }
    }
  }

  #main{
    width: 100%;
    min-height: 550px;
    padding: 30px 0;
    main{
      width: @mainWidth;
      margin: 0px auto;
      .image{
        float: left;
        width: 550px;
        img{
          margin: 50px;
        }
      }
      .detail{
        float: left;
        width: 566px;
        height: 510px;
        padding: 20px 30px;
        .title{
          font-size: 26px;
          margin-bottom: 15px;
        }
        .performance{
          width: calc(100% - 30px);
          height:120px;
          background:@backMain;
          border:1px solid @fontFour;
          padding:15px;
          display: flex;
          flex-wrap:wrap;
          .item{
            width: 265px;
            height:61px;
            .icon{
              height: 41px;
              width:41px;
              margin:10px;
              color: @fontThree;
              float: left;
            }
            .info{
              float: left;
              font-size: 13px;
              height: 40px;
              padding:10px 0;
              div{
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
        .score{
          height: 22px;
          width: 100%;
          margin: 20px 0;
          div{
            float: left;
            width: calc(50% - 2px);
            height: 22px;
            line-height: 22px;
            text-align: center;
            font-size: 14px;
          }
        }
        .price{
          height: 80px;
          width: 100%;
          background: @backMain;
          line-height: 80px;
          text-align: center;
          font-size: 16px;
          position: relative;
          b{
            font-size: 45px;
            margin:0 10px;
            position:absolute;
            top: -2px;
          }
          span{
            margin-left: 180px;
          }
          span,b{
            color:@colorTwo;
          }
        }

        .number{
          margin: 20px 0;
          span{
            font-size: 14px;
            margin-right: 20px;
            margin-left: 10px;
            color: @fontTwo;
            position: relative;
            top: 1px;
          }
        }

        .buttons{
          button{
            border-radius: 2px;
            height: 55px;
            font-size: 16px;
          }
          button:nth-of-type(1){
            width: 280px;
          }
          button:nth-of-type(2){
            width: 130px;
            margin-left: 20px;
          }
          .heart-icon{
            position: relative;
            top: 1px;
            right: 2px;
          }
        }
      }
    }
  }

  #information{
    width: 100%;
    min-height: 550px;
    padding: 30px 0;
    background: @backMain;
    .information{
      width: @mainWidth;
      margin: 0px auto;
      position: relative;
      z-index: 0;
      .tabs{
        position: relative;
        top: 2px;
        z-index: 1;
        div{
          background: white;
          display: inline-block;
          padding: 20px 25px;
          font-size: 16px;
          color: @fontTwo;
          border: 1px solid @fontFour;
          &:hover{
            cursor: pointer;
          }
        }
        div:nth-of-type(1){
          border-right: 0px;
        }
      }
      .detail{
        width: 100%;
        background: white;
        border: 1px solid @fontFour;
        min-height: 500px;
      }
    }
  }
}
</style>
