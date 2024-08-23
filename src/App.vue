<template>
  <div id="app">
    <component :is="layout">
      <router-view ></router-view>
    </component>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: "MyApp",
  computed: {
    layout() {
      return this.$route.meta.layout || DefaultLayout;
    },
  },
};
</script>

<style scoped>

</style>