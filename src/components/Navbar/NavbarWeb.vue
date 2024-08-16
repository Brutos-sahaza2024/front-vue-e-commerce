<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <navbar-brand/>
      <navbar-toggler />
      <div class="collapse navbar-collapse" id="navbarNav">
        <navbar-items />
        <search-form />
      </div>
    </nav>
  </template>
  
  <script>
  import NavbarBrand from './NavbarBrand.vue';
  import NavbarToggler from './NavbarToggler.vue';
  import NavbarItems from './NavbarItems.vue';
  import SearchForm from './SearchForm.vue';
  
  export default {
    name: 'NavbarWeb',
    components: {
      NavbarBrand,
      NavbarToggler,
      NavbarItems,
      SearchForm
    },
  }
  </script>