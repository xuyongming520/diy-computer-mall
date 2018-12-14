<template>
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
</template>

<script>
export default {
  name: 'index-header',
};
</script>
