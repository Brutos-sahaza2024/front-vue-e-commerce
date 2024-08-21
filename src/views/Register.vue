<template>
  <div class="container mt-5">
    <h2 class="mb-4">Inscription</h2>
    <form @submit.prevent="validateAndRegister">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
          :class="{ 'is-invalid': errors.email }"
          required
        >
        <div class="invalid-feedback" v-if="errors.email">
          {{ errors.email }}
        </div>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="user.username"
          :class="{ 'is-invalid': errors.username }"
          required
        >
        <div class="invalid-feedback" v-if="errors.username">
          {{ errors.username }}
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="user.password"
          :class="{ 'is-invalid': errors.password }"
          required
        >
        <div class="invalid-feedback" v-if="errors.password">
          {{ errors.password }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Inscription en cours...' : 'S\'inscrire' }}
      </button>
    </form>
    <div v-if="serverError" class="alert alert-danger mt-3">
      {{ serverError }}
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

export default {
  name: 'MyRegister',
  setup() {
    const router = useRouter()
    const user = reactive({
      email: '',
      username: '',
      password: ''
    })
    const errors = reactive({})
    const serverError = ref('')
    const isSubmitting = ref(false)

    const validateForm = () => {
      errors.email = ''
      errors.username = ''
      errors.password = ''

      if (!user.email) {
        errors.email = 'L\'email est requis'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = 'L\'email n\'est pas valide'
      }

      if (!user.username) {
        errors.username = 'Le nom d\'utilisateur est requis'
      } else if (user.username.length < 3) {
        errors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères'
      }

      if (!user.password) {
        errors.password = 'Le mot de passe est requis'
      } else if (user.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
      }

      return Object.keys(errors).every(key => errors[key] === '')
    }

    const validateAndRegister = async () => {
      if (validateForm()) {
        try {
          isSubmitting.value = true
          const response = await api.post('/api/register', user)
          console.log('Inscription réussie:', response.data)
          router.push({ name: 'app_login' })
        } catch (err) {
          serverError.value = err.response?.data?.error || "Une erreur est survenue lors de l'inscription"
        } finally {
          isSubmitting.value = false
        }
      }
    }

    return {
      user,
      errors,
      serverError,
      isSubmitting,
      validateAndRegister
    }
  }
}
</script>