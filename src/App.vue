<template>
  <div id="app">
    <TopNavigation />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import TopNavigation from '@/components/top-navigation/top-navigation.vue';
import Footer from '@/components/footer/index.vue';

export default {
  name: 'app',
  components: {
    TopNavigation,
    Footer,
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  main{
    width: 100%;
    min-height: calc(100vh - 200px);
  }
}
</style>
