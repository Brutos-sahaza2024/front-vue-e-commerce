<template>
    <a class="navbar-brand" :href="$router.resolve({ name: 'app_accueil' }).href">
      <img src="/favicon.ico" alt="logo" width="30" height="24">
    </a>
  </template>
  
  <script>
  export default {
    name: 'NavbarBrand',
    props: {
      logo: {
        type: String,
        required: true
      }
    }
  }
  </script>