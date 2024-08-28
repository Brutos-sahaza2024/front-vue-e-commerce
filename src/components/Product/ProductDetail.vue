<template>
  <div class="container mt-5">
    <div v-if="product" class="card mb-4">
      <img :src="product.imageUrl" :alt="product.name" class="card-img-top" />
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p class="card-text">{{ product.description }}</p>
        <p class="card-text"><strong>Prix:</strong> {{ product.price }} €</p>
        <p class="card-text"><strong>En stock:</strong> {{ product.stockQuantity }}</p>
        <p class="card-text" v-if="product.discount"><strong>Réduction:</strong> {{ product.discount }} €</p>
        <p class="card-text"><strong>Actif:</strong> {{ product.isActive ? 'Oui' : 'Non' }}</p>
        <p class="card-text" v-if="product.isOnPromotion"><strong>En promotion</strong></p>
        <p class="card-text"><i class="fas fa-folder"></i> <strong>Catégorie:</strong> {{ product.category.name }}</p>
        <p class="card-text"><i class="fas fa-star"></i> <strong>Note moyenne:</strong> {{ averageRating }}</p>
        <p class="card-text"><i class="fas fa-comments"></i> <strong>Nombre d'avis:</strong> {{ product.ratings.length }}</p>
      </div>
    </div>
    <div v-else class="alert alert-info" role="alert">
      Chargement des détails du produit...
    </div>
    <product-add-rating @submit="handleRatingSubmit" />
    <product-comment @submit="handleCommentSubmit" />
    <div v-if="hasComments">
    <h2 class="mt-4">Commentaires</h2>
    <div class="row">
      <div class="col-12 mb-4" v-for="comment in comments" :key="comment.id">
        <div class="card h-100 shadow">
          <div class="card-body d-flex flex-column">
            <div>
              <h5 class="card-title">{{ comment.user.username }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ formatDate(comment.createdAt) }}</h6>
            </div>
            <form v-if="comment.editing" @submit.prevent="updateComment(comment)">
              <textarea v-model="comment.content" class="form-control mb-2"></textarea>
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </form>
            <p class="card-text flex-grow-1" v-if="!comment.editing">{{ comment.content }}</p>
            <div class="mt-auto">
              <button v-if="isCurrentUser(comment.user.username)" @click="toggleEdit(comment)" class="btn btn-sm btn-secondary">
                {{ comment.editing ? 'Annuler' : 'Éditer' }}
              </button>
              <button v-if="isCurrentUser(comment.user.username)" @click="deleteComment(comment.id)" class="btn btn-sm btn-danger">
              Supprimer
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import ProductAddRating from "./ProductAddRating.vue";
import ProductComment from "./ProductComment.vue";
import { mapState } from 'vuex';

export default {
  name: 'ProductDetail',
  components: {
    ProductAddRating,
    ProductComment
  },
  data() {
    return {
      product: null
    }
  },
  computed: {
    avis() {
      return this.product?.ratings?.length || 0;
    },
    comments() {
      return this.product?.comments || [];
    },
    hasComments() {
      return this.comments.length > 0;
    },
    averageRating() {
    const sum = this.product.ratings.reduce((acc, rating) => acc + parseFloat(rating.value), 0);
    const average = sum / this.product.ratings.length;
    return parseFloat(average.toFixed(2))
  },
    ...mapState(['userInfo'])
  },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const { data } = await api.get(`/api/product/${this.$route.params.id}`);
        this.product = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit:', error);
      }
    },
    async handleRatingSubmit(value) {
      try {
        const response = await api.post(`/api/product/${this.$route.params.id}/ratings`, { value });
        this.product = {
          ...this.product,
          ratings: [...this.product.ratings,  response.data ]
        };
      } catch (error) {
        console.error('There was an error submitting the rating!', error);
      }
    },
    async handleCommentSubmit(content) {
      try {
        const response = await api.post(`/api/product/${this.$route.params.id}/comment`, { content });
        this.product = {
          ...this.product,
          comments: [...this.product.comments, response.data]
        };
      } catch (error) {
        console.error('There was an error submitting the comment!', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    isCurrentUser(username) {
      return username === this.$store.state.userInfo.user.username;
    },
    toggleEdit(comment) {
      comment.editing = !comment.editing;
    },
    updateComment(comment) {
        api.put(`/api/comments/${comment.id}`, { content: comment.content })
        .then(() => {
          comment.editing = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteComment(commentId) {
      api.delete(`/api/comments/${commentId}`)
        .then(() => {
          this.product.comments = this.product.comments.filter(comment => comment.id !== commentId);
        })
        .catch(error => {
          console.error(error);
        });
    },
  }
}
</script>

<style scoped>
.card-img-top {
  border-radius: 8px;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.8em;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1em;
  margin-bottom: 10px;
}

.card-text strong {
  font-weight: bold;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item strong {
  font-weight: bold;
}

.list-group-item small {
  margin-left: 10px;
}
</style>
