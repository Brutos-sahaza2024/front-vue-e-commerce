<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title mb-0">Ajouter un Commentaire</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleCommentSubmit">
              <div class="mb-3">
                <label for="comment" class="form-label">Commentaire :</label>
                <textarea v-model="comment" class="form-control" id="comment" rows="4" placeholder="Écrivez votre commentaire ici..."></textarea>
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
    name: "ProductComment",
    data() {
        return {
            comment: ""
        }
    },
    emits: ["submit"],
    methods:{
        handleCommentSubmit(){
            this.$emit('submit', this.comment);
            this.comment = ""
        }
    }
}
</script>

<style scoped>

</style>