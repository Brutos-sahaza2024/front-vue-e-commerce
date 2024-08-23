<template>
    <section class="mb-5">
      <h2 class="mb-3"><i :class="icon"></i> {{ title }}</h2>
      <div class="row">
        <product-card v-for="product in products" :key="product.id" :product="product" />
        <p v-if="products.length === 0" class="col-12">Aucun produit disponible pour le moment.</p>
      </div>
    </section>
  </template>
  
  <script>
  import ProductCard from '@/components/Product/ProductCard.vue'
  
  export default {
    components: {
      ProductCard
    },
    props: {
      title: String,
      icon: String,
      products: Array
    }
  }
  </script>