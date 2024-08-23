<template>
    <footer class="bg-light text-center text-lg-start mt-5">
      <div class="container p-4">
        <div class="row">
          <AboutUs />
          <UsefulLinks :links="usefulLinks" />
          <ContactLinks :links="contactLinks" />
        </div>
      </div>
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2023 E-commerce Platform. Tous droits réservés.
      </div>
    </footer>
  </template>
  
  <script>
  import AboutUs from './AboutUs.vue';
  import UsefulLinks from './UsefulLinks.vue';
  import ContactLinks from './ContactLinks.vue';
  
  export default {
    name: "MyFooter",
    components: {
      AboutUs,
      UsefulLinks,
      ContactLinks,
    },
    data() {
      return {
        usefulLinks: [
          { path: 'app_accueil', icon: 'fas fa-home', label: 'Accueil' },
          { path: '#', icon: 'fas fa-shopping-bag', label: 'Produits' },
          { path: 'app_cart', icon: 'fas fa-shopping-cart', label: 'Panier' },
          { path: 'app_support_client', icon: 'fas fa-envelope', label: 'Contact' },
        ],
        contactLinks: [
          { path: 'app_support_client', icon: 'fas fa-headset', label: 'Support Client' },
          { path: '#', icon: 'fas fa-undo', label: 'Retours et Échanges' },
          { path: 'app_faq', icon: 'fas fa-question-circle', label: 'FAQ' },
          { path: 'app_contact', icon: 'fas fa-envelope', label: 'Nous Contacter' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>

  </style>