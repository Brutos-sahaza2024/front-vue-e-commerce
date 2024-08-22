<template>
  <div class="container">
    <h2>Contactez-nous</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input type="text" v-model="form.name" class="form-control" id="name" required>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="form.email" class="form-control" id="email" required>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea v-model="form.message" class="form-control" id="message" rows="3" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  name: "MyContact",
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
  async submitForm() {
    try {
      await api.post('/api/contact', this.form);
      this.successMessage = `Votre message a été envoyé avec succès!`;
      this.errorMessage = '';
      this.resetForm();
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      this.successMessage = '';
    }
  },
  resetForm() {
    this.form.name = '';
    this.form.email = '';
    this.form.message = '';
  }
}
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 50px;
}
</style>