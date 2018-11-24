<template>
  <div id="index">
  </div>
</template>

<script>
import login from '@/api/login';

export default {
  name: 'index',
  created() {
    login().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  },
};
</script>
