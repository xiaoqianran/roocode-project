<!--
  state-management/nuxt-vuex.vue

  此文件演示 Nuxt.js 中进行状态管理。
  在 Nuxt 3 中，推荐使用 Pinia 作为状态管理库，它是 Vuex 的下一代。
  Nuxt.js 会自动配置 Pinia，并使其在服务器端和客户端都可用。
-->
<template>
  <div>
    <h1>Nuxt.js 状态管理示例 (Pinia)</h1>
    <p>计数器: {{ counterStore.count }}</p>
    <button @click="counterStore.increment()">增加</button>
    <button @click="counterStore.decrement()">减少</button>
    <p>双倍计数: {{ counterStore.doubleCount }}</p>
  </div>
</template>

<script setup>
import { defineStore } from 'pinia'; // 从 Pinia 导入 defineStore

// 定义一个 Pinia store
// defineStore 用于创建一个新的 store。第一个参数是 store 的唯一 ID。
const useCounterStore = defineStore('counter', {
  // state 是 store 的核心，用于存储应用程序的状态。
  state: () => ({
    count: 0, // 定义一个名为 count 的状态变量，初始值为 0
  }),
  // actions 是用于修改 state 的方法。它们可以是同步或异步的。
  actions: {
    /**
     * increment 方法用于增加计数器的值。
     */
    increment() {
      this.count++; // 直接修改 state
    },
    /**
     * decrement 方法用于减少计数器的值。
     */
    decrement() {
      this.count--; // 直接修改 state
    },
  },
  // getters 是用于从 state 中派生出新状态的计算属性。
  // 它们类似于 Vue 的计算属性，并且是响应式的。
  getters: {
    /**
     * doubleCount 返回 count 的两倍。
     * @param {object} state - 当前 store 的 state。
     * @returns {number} count 的两倍。
     */
    doubleCount: (state) => state.count * 2,
  },
});

// 在组件中使用 store
// useCounterStore() 返回 store 的实例，可以在组件中访问其 state、actions 和 getters。
const counterStore = useCounterStore();
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
  font-size: 1.2em;
}

button {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #35495e;
}
</style>