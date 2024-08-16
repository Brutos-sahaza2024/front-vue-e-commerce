<template>
    <div class="col-xl-4 col-md-6 mb-4">
      <div class="card h-100">
        <img :src="product.imageUrl || `/images/${product.imageFilename}`" :alt="'Image for ' + product.name" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title"><i class="fas fa-tag"></i> {{ product.name }}</h5>
          <p class="card-text"><i class="fas fa-align-justify"></i> {{ product.description }}</p>
          <p class="card-text">
            <template v-if="product.onPromotion">
              <s><i class="fas fa-euro-sign"></i> {{ product.price }} €</s>
              <i class="fas fa-euro-sign"></i> {{ (product.price - product.discount).toFixed(2) }} €
            </template>
            <template v-else>
              <i class="fas fa-euro-sign"></i> {{ product.price }} €
            </template>
          </p>
        </div>
        <div class="card-footer d-flex justify-content-around">
          <router-link :to="{ name: 'productDetail', params: { id: product.id } }" class="btn btn-primary">
            <i class="fas fa-search"></i> Détails
          </router-link>
          <button @click="addToCart" class="btn btn-info">
            <i class="fas fa-shopping-cart"></i> Panier
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: Object
    },
    methods: {
      addToCart() {
        console.log('Ajouter au panier:', this.product.id)
      }
    }
  }
  </script>