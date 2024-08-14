<template>
    <form @submit.prevent="onSubmit" class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" v-model="searchQuery" placeholder="Rechercher..." aria-label="Search">
      <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Rechercher</button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'SearchForm',
    data() {
      return {
        searchQuery: ''
      }
    },
    methods: {
      onSubmit() {
        this.$router.push({ name: 'search', query: { q: this.searchQuery } });
      }
    }
  }
  </script>