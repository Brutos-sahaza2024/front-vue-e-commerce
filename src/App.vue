<template>
  <div id="app">
    <navbar-web/>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
import NavbarWeb from './components/Navbar/NavbarWeb.vue';


export default {
  name: 'App',
  components: {
    NavbarWeb,
  },
};
</script>

<style scoped>
.router-view {
  padding-top: 56px;
}
</style>