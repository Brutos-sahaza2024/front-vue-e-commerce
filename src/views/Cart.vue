<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Panier <i class="bi bi-cart"></i></h1>
    
    <table class="table table-bordered text-center" v-if="cart.length">
        <thead class="table-light">
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
                <td>{{ (item.price * item.quantity).toFixed(2) }} €</td>
                <td>
                    <button class="btn btn-success btn-sm mr-2" @click="increaseQuantity(index)">
                        <i class="bi bi-plus"></i>
                    </button>
                    <button class="btn btn-warning btn-sm mr-2" @click="decreaseQuantity(index)">
                        <i class="bi bi-dash"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" @click="removeItem(index)">
                        <i class="bi bi-trash"></i> Supprimer
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    
    <p v-else class="text-center"><i class="bi bi-cart-x"></i> Votre panier est vide.</p>
    
    <div class="mt-3 text-center">
        <h4>Total: {{ totalPrice.toFixed(2) }} €</h4>
        <button v-if="cart.length" class="btn btn-primary" @click="checkout">
            <i class="bi bi-check"></i> Passer à la caisse
        </button>
    </div>

    <!-- Section pour le formulaire de paiement -->
    <div v-if="clientSecret" class="mt-5">
        <h2 class="text-center">Paiement <i class="bi bi-credit-card"></i></h2>
        <form id="payment-form" @submit.prevent="handleSubmit">
            <div id="card-element" class="mb-3"></div>
            <button class="btn btn-success mt-3" type="submit">
                <i class="bi bi-credit-card"></i> Payer
            </button>
        </form>
        <div id="card-errors" role="alert" class="text-danger"></div>
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

        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);

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
