<!--
  middleware-request-processing/nuxt-middleware.vue

  此文件演示 Nuxt.js 中如何使用路由中间件 (Route Middleware)。
  Nuxt.js 提供了两种类型的中间件：
  1. 路由中间件 (Route Middleware): 在导航到特定路由之前运行。
  2. 全局中间件 (Global Middleware): 在每次路由导航时运行。

  这个示例展示了一个简单的路由中间件，用于检查用户是否已认证。
  在 Nuxt 3 中，路由中间件通常定义在 `middleware/` 目录下，并使用 `defineNuxtRouteMiddleware`。
-->
<template>
  <div>
    <h1>Nuxt.js 中间件示例</h1>
    <p>此页面受认证中间件保护。</p>
    <p v-if="isAuthenticated">您已登录！</p>
    <p v-else>请登录以访问此内容。</p>
    <button @click="toggleAuth">切换登录状态</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // 导入 Vue 的 ref 函数
import { defineNuxtRouteMiddleware, navigateTo } from '#app'; // 导入 Nuxt 路由中间件相关函数

// 模拟用户认证状态
const isAuthenticated = ref(false);

/**
 * toggleAuth 方法用于切换模拟的认证状态。
 */
const toggleAuth = () => {
  isAuthenticated.value = !isAuthenticated.value;
  alert(`登录状态已切换为: ${isAuthenticated.value ? '已登录' : '未登录'}`);
  // 切换状态后，可以考虑重新导航或刷新页面以触发中间件
  // navigateTo('/'); // 示例：切换后导航回首页
};

// 定义一个路由中间件
// 这个中间件通常会放在 `middleware/auth.js` 或 `middleware/auth.ts` 文件中
// 然后在页面组件中使用 `definePageMeta({ middleware: ['auth'] })` 来应用。
const authMiddleware = defineNuxtRouteMiddleware((to, from) => {
  // 在实际应用中，这里会检查用户的真实认证 token 或 session
  if (!isAuthenticated.value) {
    // 如果用户未认证，则重定向到登录页面或首页
    alert('您没有权限访问此页面，将重定向到首页。');
    return navigateTo('/'); // 重定向到首页
  }
});

// 在页面组件中应用中间件
// definePageMeta 是 Nuxt 3 提供的宏，用于定义页面元数据，包括中间件。
definePageMeta({
  middleware: [authMiddleware] // 应用 authMiddleware
});
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

button {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #35495e;
}
</style>