/* eslint-disable vue/multi-word-component-names */
import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import ProductsByCategory from '@/views/ProductsByCategory.vue';
import Cart from '@/views/Cart.vue';
import SupportClient from '@/views/SupportClient.vue';
import FAQ from '@/views/FAQ.vue';
import Contact from '@/views/Contact.vue';
import Search from '@/views/Search.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import ProductDetail from './components/Product/ProductDetail.vue';

const routes = [
  {
    path: '/',
    name: 'app_accueil',
    component: Home
  },
  {
    path: '/products/:categoryName',
    name: 'products_by_category',
    component: ProductsByCategory,
    props: true
  },
  {
    path: '/cart',
    name: 'app_cart',
    component: Cart
  },
  {
    path: '/support-client',
    name: 'app_support_client',
    component: SupportClient
  },
  {
    path: '/faq',
    name: 'app_faq',
    component: FAQ
  },
  {
    path: '/contact',
    name: 'app_contact',
    component: Contact
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/login',
    name: 'app_login',
    component: Login
  },
  {
    path: '/register',
    name: 'app_register',
    component: Register
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: Home, }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
