<template>
  <div class="container mt-5">
    <form @submit.prevent="login" class="w-50 mx-auto">
      <div class="mb-3">
        <label for="email" class="form-label">Adresse Email</label>
        <input 
          v-model="email" 
          type="email" 
          id="email" 
          class="form-control" 
          placeholder="Entrez votre email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          class="form-control" 
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <div class="form-check mb-3">
        <input 
          type="checkbox" 
          id="rememberMe" 
          v-model="rememberMe" 
          class="form-check-input" 
        />
        <label for="rememberMe" class="form-check-label">Se souvenir de moi</label>
      </div>
      <button type="submit" class="btn btn-primary w-100">Connexion</button>
    </form>
  </div>
</template>


<script>
import api from '@/utils/api'

export default {
  name: "MyLogin",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/api/login_check', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>
