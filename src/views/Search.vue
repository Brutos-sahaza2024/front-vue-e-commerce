<template>
    <product-list :query="query" :products="results"/>
</template>

<script>
import api from "@/utils/api";
import ProductList from '../components/Product/Search/ProductList.vue';

export default {
  name: 'SearchPage',
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      results: []
    }
  },
  components: {
    ProductList
  },
  watch: {
    query: {
      immediate: true,
      handler(newQuery) {
        this.searchProducts(newQuery);
      }
    }
  },
  methods: {
    async searchProducts(query) {
      try {
        const response = await api.get(`/api/product/search?query=${query}`);
        this.results = response.data;
      } catch (error) {
        console.error('Erreur lors de la recherche des produits:', error);
      }
    }
  }
}
</script>
