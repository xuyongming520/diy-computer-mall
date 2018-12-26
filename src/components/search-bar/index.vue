<template>
  <div id="search-bar">
    <img src="../../assets/images/logo/logo.png" height="100px" alt="DIYC" style="float:left"/>
    <div class="search">
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="input"
        @keyup.enter.native="search">
        <el-select v-model="select" slot="prepend" placeholder="请选择" class="select-list">
          <el-option
            v-for="item in selectList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          class="search-button"
          @click="search"
        >
          搜索
        </el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  data() {
    return {
      input: '',
      select: '',
      selectList: [
        { value: '', name: '全部' },
        { value: '1', name: '机箱' },
        { value: '2', name: 'CPU' },
        { value: '3', name: '散热器' },
        { value: '4', name: '显卡' },
        { value: '5', name: '机械硬盘' },
        { value: '6', name: '显示器' },
        { value: '7', name: '主板' },
        { value: '8', name: '电源' },
        { value: '9', name: '内存' },
        { value: '10', name: '固态硬盘' },
      ],
    };
  },
  methods: {
    search() {
      if (this.input && this.select) {
        this.$router.push({ path: `/search/${this.input}`, query: { classId: this.select } });
      } else if (this.input) {
        this.$router.push({ path: `/search/${this.input}` });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../../styles/number.less');
@import url('../../styles/color.less');
#search-bar{
  width: @mainWidth;
  margin: 10px auto;
  height: 100px;
  line-height: 100px;
  .search{
    width: 630px;
    margin: 0px auto;
    .input-with-select{
      width: 630px;
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
</style>
