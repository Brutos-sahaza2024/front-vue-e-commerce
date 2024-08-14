<template>
  <li class="nav-item dropdown" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
    <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ title }}
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <router-link v-for="item in items" :key="item.name" class="dropdown-item text-dark" :to="item.route">
        {{ item.name }}
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'NavbarDropdown',
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleMouseOver(event) {
      event.currentTarget.querySelector('.dropdown-menu').classList.add('show');
    },
    handleMouseOut(event) {
      event.currentTarget.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
};
</script>

<style scoped>
</style>
