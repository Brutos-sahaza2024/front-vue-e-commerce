<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title mb-0">Ajouter une évaluation</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRatingSubmit">
              <div class="mb-3">
                <label for="rating" class="form-label">Évaluation :</label>
                <select v-model="value" class="form-select" id="rating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "ProductAddRating",
    data() {
        return {
            value: 1 
        }
    },
    emits: ["submit"],
    methods: {
        handleRatingSubmit() {
            this.$emit('submit', this.value)
        }
    }
}
</script>

<style scoped>

</style>