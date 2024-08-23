<template>
    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
      <h5 class="text-uppercase"><i class="fas fa-link"></i> Liens utiles</h5>
      <ul class="list-unstyled mb-0">
        <li v-for="link in links" :key="link.label">
          <a :href="link.path" class="text-dark">
            <i :class="link.icon"></i> {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UsefulLinks',
    props: {
      links: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez ici des styles spécifiques à UsefulLinks si nécessaire */
  </style>