<!-- 06-ListRendering.vue: Vue 3 列表渲染示例 -->
<template>
  <div class="list-rendering">
    <h1>Vue 3 列表渲染 (`v-for`)</h1>

    <h2>渲染字符串数组</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ index }}: {{ item }}
      </li>
    </ul>

    <h2>渲染对象数组</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        ID: {{ user.id }}, 姓名: {{ user.name }}, 年龄: {{ user.age }}
      </li>
    </ul>

    <h2>渲染数字范围</h2>
    <ul>
      <li v-for="n in 5" :key="n">
        这是第 {{ n }} 项
      </li>
    </ul>

    <h2>带有索引的 `v-for`</h2>
    <p>使用 `(value, key, index)` 语法遍历对象属性:</p>
    <ul>
      <li v-for="(value, key, index) in userInfo" :key="key">
        {{ index }}. {{ key }}: {{ value }}
      </li>
    </ul>

    <h2>`v-for` 与 `v-if` (不推荐直接在同一元素上使用)</h2>
    <p>
      Vue 3 推荐将 `v-if` 放在 `v-for` 的外部或内部元素上，而不是直接在同一元素上。
      这里为了演示，将 `v-if` 放在 `v-for` 的内部。
    </p>
    <ul>
      <template v-for="item in itemsWithCondition" :key="item.id">
        <li v-if="item.isVisible">
          {{ item.text }} (可见)
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * @module 06-ListRendering
 * @description Vue 3 列表渲染示例，使用 `v-for` 指令。
 */

// 字符串数组
const items = ref(['Apple', 'Banana', 'Orange']);

// 对象数组
const users = ref([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
]);

// 对象，用于遍历属性
const userInfo = ref({
  firstName: 'John',
  lastName: 'Doe',
  occupation: 'Engineer'
});

// 带有条件的数组
const itemsWithCondition = ref([
  { id: 1, text: 'Item A', isVisible: true },
  { id: 2, text: 'Item B', isVisible: false },
  { id: 3, text: 'Item C', isVisible: true }
]);
</script>

<style scoped>
.list-rendering {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
  margin-top: 20px;
}

h1, h2 {
  color: #2c3e50;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 15px;
}

li {
  margin-bottom: 5px;
}
</style>