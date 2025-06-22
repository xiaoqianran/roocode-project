<template>
  <div>
    <h1>User Page (Nuxt)</h1>
    <p>User ID: {{ $route.params.id }}</p>
    <NuxtLink to="/">Go to Home</NuxtLink>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    // 必须是数字
    return /^\d+$/.test(params.id);
  }
}
</script>