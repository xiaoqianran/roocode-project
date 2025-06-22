<!--
  core-purpose/nuxt-domain.vue

  此文件演示 Nuxt.js 作为 Vue.js 的元框架，主要用于构建服务器端渲染 (SSR)、
  静态站点生成 (SSG) 和单页应用 (SPA)。它展示了一个基本的 Nuxt 页面组件。
-->
<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageDescription }}</p>
  </div>
</template>

<script>
export default {
  // data() 函数用于定义组件的响应式数据。
  // 在 Nuxt.js 页面组件中，这些数据可以在服务器端预渲染。
  data() {
    return {
      pageTitle: '欢迎来到 Nuxt.js 应用', // 页面标题数据
      pageDescription: '这是一个演示 Nuxt.js 核心目的的示例页面。' // 页面描述数据
    }
  },
  // head() 方法用于定义页面的元信息，如标题、meta 标签等。
  // Nuxt.js 会在服务器端渲染时将这些信息注入到 HTML 的 <head> 部分。
  head() {
    return {
      title: this.pageTitle, // 使用组件数据作为页面标题
      meta: [
        {
          hid: 'description', // 唯一的 ID，防止重复
          name: 'description',
          content: this.pageDescription // 使用组件数据作为 meta 描述
        }
      ]
    }
  }
}
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

p {
  color: #41b883;
}
</style>