<!--
  data-fetching/nuxt-ssr.vue

  此文件演示 Nuxt.js 中进行服务器端渲染 (SSR) 时的数据获取。
  在 Nuxt 3 中，推荐使用 `useAsyncData` 或 `useFetch` 组合式函数来在服务器端获取数据。
  这些函数会在服务器端执行，并将数据预加载到页面中，从而实现更好的 SEO 和更快的首次加载。
-->
<template>
  <div>
    <h1>Nuxt.js SSR 数据获取示例</h1>
    <p v-if="pending">加载中...</p>
    <div v-else>
      <h2>用户列表:</h2>
      <ul>
        <!-- 遍历从 API 获取的用户数据 -->
        <li v-for="user in users" :key="user.id">
          {{ user.name }} ({{ user.email }})
        </li>
      </ul>
    </div>
    <p v-if="error">加载失败: {{ error.message }}</p>
  </div>
</template>

<script setup>
// useAsyncData 是 Nuxt 3 提供的组合式函数，用于在服务器端或客户端异步获取数据。
// 它会在组件渲染之前执行，并将数据预加载到页面中。
const { data: users, pending, error } = await useAsyncData('users', async () => {
  // 模拟一个 API 请求，这里使用 setTimeout 模拟网络延迟
  // 实际应用中，这里会是 `await $fetch('/api/users')` 或其他 HTTP 请求库
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
      ]);
    }, 1000); // 模拟 1 秒延迟
  });
});

// 可以在这里添加其他 Vue 组合式 API 逻辑
</script>

<style scoped>
/* scoped 属性确保样式只应用于当前组件 */
div {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #35495e;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #fff;
  margin: 10px auto;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

p {
  color: #41b883;
}
</style>