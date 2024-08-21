<template>
  <div class="container">
    <h1 class="my-4"><i class="fas fa-store"></i> Bienvenue sur notre site e-commerce</h1>
    <ProductSection title="Produits en Vedette" icon="fas fa-star" :products="featuredProducts" />
    <ProductSection title="Nouveautés" icon="fas fa-gift" :products="newArrivals" />
    <ProductSection title="Promotions et Offres Spéciales" icon="fas fa-tags" :products="promotions" />
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<script>
// ProductSection.vue
import ProductSection from '@/components/Product/ProductSection.vue'
import { ref, onMounted } from 'vue'
import api from "@/utils/api";

export default {
  name: "MyHome",
  components: {
    ProductSection
  },
  setup() {
    const featuredProducts = ref([])
    const newArrivals = ref([])
    const promotions = ref([])
    const error = ref(null)

    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/product/')
        const products = response.data
        featuredProducts.value = products.filter(p => p.isFeatured)
        newArrivals.value = products.filter(p => p.isNewArrival)
        promotions.value = products.filter(p => p.isOnPromotion)
      } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err)
        error.value = 'Erreur lors de la récupération des produits. Veuillez réessayer plus tard.'
      }
    }

    onMounted(fetchProducts)

    return {
      featuredProducts,
      newArrivals,
      promotions,
      error
    }
  }
}
</script>

<style scoped>
</style>
