<template>
  <div id="left-menu">
    <router-link tag="span" v-for="item in menu" :key="item.name" :to="item.path">
      {{item.name}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'left-menu',
  props: {
    menu: Array,
  },
};
</script>

<style lang="less" scoped>
#left-menu{
  float: left;
}
span{
  font-size: 14px;
  padding-right: 6px;
  border-right:1px solid #C0C4CC;
  margin-right: 6px;
  transition: all .25s;
  &:hover{
    color: white;
    cursor: pointer;
  }
}
</style>
