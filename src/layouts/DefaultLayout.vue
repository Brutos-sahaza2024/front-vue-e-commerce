<template>
  <div>
    <navbar-web />
   <main>
      <router-view />
    </main>
  </div>

</template>
  
  <script>
import NavbarWeb from '@/components/Navbar/NavbarWeb.vue';

export default {
    name: 'DefaultLayout',
    components:{
        NavbarWeb
    }
  };
  </script>
  
  <style scoped>

  </style>
  