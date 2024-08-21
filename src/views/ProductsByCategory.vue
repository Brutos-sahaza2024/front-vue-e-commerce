<template>
  <div class="container mt-4">
    <h2>Produits dans la catégorie : {{ categoryName }}</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-else class="row">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="col-md-4 mb-4"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import api from '@/utils/api';
import ProductCard from '@/components/Product/ProductCard.vue';

export default {
  name: 'ProductsByCategory',
  components: {
    ProductCard
  },
  props: {
    categoryName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await api.get(`/api/product/category/${props.categoryName}`);
        products.value = response.data;
        console.log(products);
      } catch (err) {
        error.value = "Une erreur est survenue lors du chargement des produits.";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchProducts);

    watch(() => props.categoryName, fetchProducts);

    return {
      products,
      loading,
      error
    };
  }
}
</script>