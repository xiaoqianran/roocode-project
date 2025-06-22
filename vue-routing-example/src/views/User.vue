<template>
  <div>
    <h1>User Page</h1>
    <p>User ID: {{ $route.params.id }}</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'User',
};
</script>