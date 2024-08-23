<template>
    <div class="auth-layout">
        <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthLayout',
  };
  </script>
  
  <style scoped>
  .auth-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
  }

  </style>
  