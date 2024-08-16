<template>
    <div v-if="product" class="product-detail">
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
    <div v-else>
      <p>Chargement des détails du produit...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: null
      }
    },
    created() {
      this.fetchProductDetails();
    },
    methods: {
      async fetchProductDetails() {
        try {
          const response = await axios.get(`http://127.0.0.1:8081/api/product/${this.$route.params.id}`);
          this.product = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des détails du produit:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .product-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 600px;
  }
  
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .product-info {
    text-align: center;
    margin-top: 20px;
  }
  
  .product-name {
    font-size: 1.8em;
    margin-bottom: 10px;
  }
  
  .product-description {
    font-size: 1em;
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 1.4em;
    color: #e74c3c;
    margin-bottom: 10px;
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
  