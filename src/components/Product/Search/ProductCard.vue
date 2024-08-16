<template>
    <div class="product-card">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }} €</p>
        <p class="product-stock">En stock: {{ product.stockQuantity }}</p>
        <p class="product-rating">Note: {{ product.rating }}/5 ({{ product.numberOfReviews }} avis)</p>
        <p class="product-discount" v-if="product.discount">Réduction: {{ product.discount }} €</p>
        <p class="product-active">Actif: {{ product.active ? 'Oui' : 'Non' }}</p>
        <p class="product-promotion" v-if="product.onPromotion">En promotion</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCardSearch',
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    margin: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .product-card:hover {
    transform: scale(1.02);
  }
  
  .product-image {
    width: 100%;
    height: auto;
  }
  
  .product-info {
    padding: 16px;
  }
  
  .product-name {
    font-size: 1.5em;
    margin-bottom: 8px;
  }
  
  .product-description {
    font-size: 1em;
    margin-bottom: 8px;
  }
  
  .product-price {
    font-size: 1.2em;
    color: #e74c3c;
    margin-bottom: 8px;
  }
  
  .product-stock,
  .product-rating,
  .product-discount,
  .product-active,
  .product-promotion {
    font-size: 0.9em;
    color: #555;
  }
  </style>
  