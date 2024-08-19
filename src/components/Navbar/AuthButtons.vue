<template>
  <div class="m-1 d-flex align-items-center">
    <template v-if="isLoggedIn">
      <button @click="logout" class="btn btn-danger d-flex align-items-center">
        <i class="fas fa-sign-out-alt me-2"></i>
        Déconnexion
      </button>
    </template>
    <template v-else>
      <router-link :to="{ name: 'app_login' }" class="btn btn-primary d-flex align-items-center me-2">
        <i class="fas fa-sign-in-alt me-2"></i>
        Connexion
      </router-link>
      <router-link :to="{ name: 'app_register' }" class="btn btn-secondary d-flex align-items-center">
        <i class="fas fa-user-plus me-2"></i>
        Inscription
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AuthButtons',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'app_login' });
    }
  }
}
</script>
