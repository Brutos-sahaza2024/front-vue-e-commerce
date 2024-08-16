<template>
    <div>
      <h1>Résultats de la recherche pour "{{ query }}"</h1>
      <div class="product-list" v-if="products.length">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <p v-else>Aucun résultat trouvé.</p>
    </div>
  </template>
  
  <script>
  import ProductCard from "./ProductCard.vue";
  
  export default {
    name: 'ProductList',
    components: {
      ProductCard
    },
    props: {
      query: {
        type: String,
        required: true
      },
      products: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>
  