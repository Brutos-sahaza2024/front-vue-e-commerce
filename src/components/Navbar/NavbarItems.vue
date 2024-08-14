<template>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link text-dark" :to="{ name: 'app_accueil' }">
          Accueil <span class="sr-only">(current)</span>
        </router-link>
      </li>
      <NavbarDropdown title="Produits" :items="productCategories" />
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'app_cart' }">Panier</router-link>
      </li>
      <NavbarDropdown title="Contact" :items="contactItems" />
    </ul>
  </template>
  
  <script>
  import NavbarDropdown from './NavbarDropdown.vue';
  
  export default {
    name: 'NavbarItems',
    components: {
      NavbarDropdown
    },
    data() {
      return {
        productCategories: [
          { name: 'Électronique', route: { name: 'products_by_category', params: { categoryName: 'electronique' } } },
          { name: 'Mode', route: { name: 'products_by_category', params: { categoryName: 'mode' } } },
          { name: 'Maison', route: { name: 'products_by_category', params: { categoryName: 'maison' } } },
          { name: 'Sport', route: { name: 'products_by_category', params: { categoryName: 'sport' } } }
        ],
        contactItems: [
          { name: 'Support Client', route: { name: 'app_support_client' } },
          { name: 'Retours et Échanges', route: '#' },
          { name: 'FAQ', route: { name: 'app_faq' } },
          { name: 'Nous Contacter', route: { name: 'app_contact' } }
        ]
      }
    }
  }
  </script>