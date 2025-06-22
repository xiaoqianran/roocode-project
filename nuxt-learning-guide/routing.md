# Nuxt.js 功能点：路由 (Routing)

## 概述

在 Vue.js 应用中，我们通常使用 Vue Router 来配置和管理路由。而在 Nuxt.js 中，路由是基于文件系统自动生成的，这大大简化了路由的配置工作。Nuxt.js 会根据 `pages` 目录下的 `.vue` 文件结构自动生成对应的路由。

## Vue.js 中的路由

在 Vue.js 中，你需要手动定义路由配置，通常在一个单独的文件中（例如 `router/index.js`），然后将其注入到 Vue 实例中。

### 代码示例 (Vue.js)

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import User from '../views/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');

// views/Home.vue
<template>
  <div>
    <h1>Home Page</h1>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/user/123">Go to User 123</router-link>
  </div>
</template>

// views/About.vue
<template>
  <div>
    <h1>About Page</h1>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

// views/User.vue
<template>
  <div>
    <h1>User Page</h1>
    <p>User ID: {{ $route.params.id }}</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>
```

## Nuxt.js 中的路由

Nuxt.js 采用约定优于配置的原则，通过 `pages` 目录结构自动生成路由。

### 静态路由

在 `pages` 目录下创建 `.vue` 文件，文件名即为路由路径。

### 动态路由

使用下划线 `_` 作为文件或目录的前缀来创建动态路由。例如，`pages/users/_id.vue` 会生成 `/users/:id` 路由。

### 嵌套路由

通过创建目录和其中的 `index.vue` 文件来创建嵌套路由。例如，`pages/users/index.vue` 和 `pages/users/profile.vue`。

### 路由参数校验

Nuxt.js 允许你在页面组件中定义 `validate` 方法来校验动态路由参数。

### 代码示例 (Nuxt.js)

```javascript
// pages/index.vue
<template>
  <div>
    <h1>Home Page (Nuxt)</h1>
    <NuxtLink to="/about">Go to About</NuxtLink>
    <NuxtLink to="/user/456">Go to User 456</NuxtLink>
  </div>
</template>

// pages/about.vue
<template>
  <div>
    <h1>About Page (Nuxt)</h1>
    <NuxtLink to="/">Go to Home</NuxtLink>
  </div>
</template>

// pages/user/_id.vue
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

// pages/users/index.vue (嵌套路由示例)
<template>
  <div>
    <h1>Users List (Nuxt)</h1>
    <NuxtLink to="/users/profile">Go to User Profile</NuxtLink>
  </div>
</template>

// pages/users/profile.vue (嵌套路由示例)
<template>
  <div>
    <h1>User Profile (Nuxt)</h1>
    <NuxtLink to="/users">Back to Users List</NuxtLink>
  </div>
</template>
```

## 总结对比

| 特性       | Vue.js (Vue Router)                               | Nuxt.js                                           |
| :--------- | :------------------------------------------------ | :------------------------------------------------ |
| **配置方式** | 手动配置路由表，需要导入组件并定义路径。          | 基于 `pages` 目录结构自动生成路由。               |
| **动态路由** | 需要在路由配置中明确定义 `:param`。             | 使用 `_` 前缀的文件或目录自动生成动态路由。       |
| **嵌套路由** | 需要在路由配置中使用 `children` 数组。          | 通过目录结构和 `index.vue` 文件自动生成。         |
| **路由链接** | 使用 `<router-link>` 组件。                       | 使用 `<NuxtLink>` 组件 (内部封装了 `<router-link>`)。 |
| **参数校验** | 通常在组件内部通过导航守卫或组件内守卫手动实现。 | 页面组件提供 `validate` 方法进行参数校验。        |
| **优点**   | 灵活，完全手动控制路由逻辑。                      | 约定优于配置，开发效率高，减少重复性工作。        |
| **缺点**   | 配置量大，尤其对于大型应用。                      | 学习曲线较平缓，但对于特殊路由需求可能需要额外配置。 |

Nuxt.js 的文件系统路由极大地简化了路由管理，使得开发者可以更专注于页面内容的开发，而不是繁琐的路由配置。