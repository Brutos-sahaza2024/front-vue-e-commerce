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
          <button @click="addToCart"  :class="buttonClass">
            <i :class="iconClass"></i> Panier
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
    data(){
      return {
        buttonClass: 'btn btn-info',
        iconClass: 'fas fa-shopping-cart'
      }
    },
    methods: {
      addToCart() {
      this.buttonClass = 'btn btn-success';
      this.iconClass = 'fas fa-check';

      setTimeout(() => {
        this.buttonClass = 'btn btn-info';
        this.iconClass = 'fas fa-shopping-cart';
      }, 250);

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log(cart);
      let existingProduct = cart.find(item => item.id == this.product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  }
  </script>