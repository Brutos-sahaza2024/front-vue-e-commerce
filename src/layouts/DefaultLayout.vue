<template>
  <div>
    <navbar-web ref="navbar" />
    <div class="router-view" :style="{ minHeight: routerViewHeight }">
      <router-view />
    </div>
    <footer-web ref="footer" />
  </div>
</template>

<script>
import NavbarWeb from "@/components/Navbar/NavbarWeb.vue";
import FooterWeb from "@/components/Footer/FooterWeb.vue";

export default {
  name: 'DefaultLayout',
  components: {
    NavbarWeb,
    FooterWeb
  },
  data() {
    return {
      routerViewHeight: '100vh',
    };
  },
  mounted() {
    this.calculateRouterViewHeight();
  },
  methods: {
    calculateRouterViewHeight() {
      const navbarHeight = this.$refs.navbar.$el.offsetHeight;
      const footerHeight = this.$refs.footer.$el.offsetHeight;
      this.routerViewHeight = `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`;
    },
  },
};
</script>

<style scoped>
.router-view {
  display: flex;
  flex-direction: column;
}
</style>
