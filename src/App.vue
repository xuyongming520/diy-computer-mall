<template>
  <div id="app">
    <TopNavigation />
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavigation from '@/components/top-navigation/top-navigation.vue';

export default {
  name: 'app',
  components: {
    TopNavigation,
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
