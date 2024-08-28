<template>
    <a class="navbar-brand" :href="$router.resolve({ name: 'app_accueil' }).href">
      <img :src="path" alt="logo" width="30" height="24">
    </a>
  </template>
  
  <script>
import api from "@/utils/api";

  export default {
    name: 'NavbarBrand',
    data(){
      return {
        path : ""
      } 
    },
    mounted(){
      this.logo()
    },
    methods : {
      async logo(){
        try {
          const response =await api.get("/api/logo/site");
          this.path = `http://127.0.0.1:8081/images/logos/${response.data.path}`
        } catch (error) {
          console.log(`error: ${error}`);
        }
      }
    }
  }

  </script>