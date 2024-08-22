<template>
  <div class="container mt-5">
    <h1 class="mb-4">Panier</h1>
    <table class="table table-bordered" v-if="cart.length">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Prix total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }} €</td>
          <td>{{ item.price * item.quantity }} €</td>
          <td>
            <button class="btn btn-success btn-sm mr-2" @click="increaseQuantity(index)">+</button>
            <button class="btn btn-warning btn-sm mr-2" @click="decreaseQuantity(index)">-</button>
            <button class="btn btn-danger btn-sm" @click="removeItem(index)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Votre panier est vide.</p>
    <div class="mt-3">
      <h4>Total: {{ totalPrice }} €</h4>
      <button class="btn btn-primary" @click="checkout">Passer à la caisse</button>
    </div>

    <!-- Section pour le formulaire de paiement -->
    <div v-if="clientSecret">
      <h2 class="mt-5">Paiement</h2>
      <form id="payment-form" @submit.prevent="handleSubmit">
        <div id="card-element"></div>
        <button class="btn btn-success mt-3" type="submit">Payer</button>
      </form>
      <div id="card-errors" role="alert"></div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';
import { loadStripe } from '@stripe/stripe-js';

export default {
  name: 'MyCart',
  data() {
    return {
      cart: [],
      clientSecret: null,
      stripe: null,
      cardElement: null
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    increaseQuantity(index) {
      this.cart[index].quantity += 1;
      this.updateCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
        this.updateCart();
      } else {
        this.removeItem(index);
      }
    },
    removeItem(index) {
      this.cart.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    async checkout() {
      try {
        const response = await api.post('/api/payment', {
          cart: this.cart
        });

        this.clientSecret = response.data.clientSecret;

        this.stripe = await loadStripe('pk_test_51PjI9cF51Ll5Vzm06T3SrClUqj4GH7VfSpqUFhi6BtMk4w2btVnN5Qfyb8xLHV3fagQ4D19tqPEWqrZWuN7rFcsG00Znlg1S1w');

        const elements = this.stripe.elements();
        this.cardElement = elements.create('card');
        this.cardElement.mount('#card-element');
      } catch (error) {
        console.error(error);
      }
    },
    async handleSubmit() {
      try {
        const { error } = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.cardElement,
          }
        });

        if (error) {
          document.getElementById('card-errors').textContent = error.message;
        } else {
          window.location.href = '/payment-success';
        }
      } catch (error) {
        console.error('Payment failed', error);
      }
    }
  }
}
</script>

<style scoped>

</style>
