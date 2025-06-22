<!-- 01-ComponentDefinition.vue: Vue 3 组件定义与结构示例 -->
<template>
  <div class="component-definition">
    <h1>Vue 3 组件定义</h1>
    <p>这是一个简单的Vue 3组件。</p>
    <p>计数器值: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
// 导入 Vue 3 的响应式 API
import { ref } from 'vue';

/**
 * @module 01-ComponentDefinition
 * @description Vue 3 组件定义与结构示例。
 * 使用 `<script setup>` 语法糖，简化组件的编写。
 */

// 定义一个响应式状态变量 `count`
// `ref` 用于创建基本数据类型的响应式引用
const count = ref(0);

/**
 * @function increment
 * @description 增加计数器值的方法。
 * 直接修改 `count.value` 来更新响应式状态。
 */
const increment = () => {
  count.value++;
};
</script>

<style scoped>
/* 组件的局部样式 */
.component-definition {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
}

h1 {
  color: #2c3e50;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369f6e;
}
</style>