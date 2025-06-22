<!--
  project-structure/nuxt-routing.vue

  此文件演示 Nuxt.js 的项目结构和模块化，特别是其基于文件系统的路由。
  在 Nuxt.js 中，`pages` 目录下的 `.vue` 文件会自动生成路由。
  这个示例展示了一个简单的页面组件，以及如何使用 NuxtLink 进行导航。
-->
<template>
  <div>
    <h1>Nuxt.js 路由示例</h1>
    <p>当前路径: {{ $route.path }}</p>
    <nav>
      <!-- NuxtLink 是 Nuxt.js 提供的组件，用于在应用内部进行导航，
           它会自动处理预加载和路由优化。 -->
      <NuxtLink to="/">首页</NuxtLink> |
      <NuxtLink to="/about">关于我们</NuxtLink> |
      <NuxtLink to="/users">用户列表</NuxtLink>
    </nav>
    <!-- Nuxt 3 中不再需要 <NuxtPage />，路由视图会自动渲染 -->
    <!-- <NuxtPage /> -->
  </div>
</template>

<script>
export default {
  // name 属性用于组件的调试和自引用。
  name: 'NuxtRoutingExample',
  // data() 函数用于定义组件的响应式数据。
  data() {
    return {
      message: '欢迎来到 Nuxt.js 路由示例！'
    };
  },
  // mounted() 是 Vue.js 的生命周期钩子，在组件挂载到 DOM 后调用。
  mounted() {
    console.log('Nuxt.js 路由示例页面已挂载。');
  }
};
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

nav {
  margin-top: 20px;
}

nav a {
  margin: 0 10px;
  color: #41b883;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>