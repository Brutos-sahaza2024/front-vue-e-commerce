<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <navbar-brand/>
      <navbar-toggler />
      <div class="collapse navbar-collapse" id="navbarNav">
        <navbar-items />
        <search-form />
        <auth-buttons />
      </div>
    </nav>
  </template>
  
  <script>
  import NavbarBrand from './NavbarBrand.vue';
  import NavbarToggler from './NavbarToggler.vue';
  import NavbarItems from './NavbarItems.vue';
  import SearchForm from './SearchForm.vue';
  import AuthButtons from "./AuthButtons.vue";
  
  export default {
    name: 'NavbarWeb',
    components: {
      NavbarBrand,
      NavbarToggler,
      NavbarItems,
      SearchForm,
      AuthButtons
    },
  }
  </script>