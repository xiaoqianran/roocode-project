<!-- 02-StateManagement.vue: Vue 3 状态管理示例 -->
<template>
  <div class="state-management">
    <h1>Vue 3 状态管理</h1>
    
    <h2>使用 `ref` (处理基本类型)</h2>
    <p>计数器: {{ countRef }}</p>
    <button @click="incrementRef">增加 Ref</button>

    <h2>使用 `reactive` (处理对象/数组)</h2>
    <p>用户信息: {{ userReactive.name }} (年龄: {{ userReactive.age }})</p>
    <button @click="updateUserReactive">更新 Reactive 用户</button>
    <button @click="addSkill">添加技能</button>
    <ul>
      <li v-for="skill in userReactive.skills" :key="skill">{{ skill }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

/**
 * @module 02-StateManagement
 * @description Vue 3 状态管理示例，对比 `ref` 和 `reactive`。
 */

// --- 使用 `ref` 进行状态管理 ---
// `ref` 用于创建基本数据类型（如字符串、数字、布尔值）的响应式引用。
// 访问其值需要通过 `.value`。
const countRef = ref(0);

/**
 * @function incrementRef
 * @description 增加 `countRef` 的值。
 * 直接修改 `countRef.value` 会触发视图更新。
 */
const incrementRef = () => {
  countRef.value++;
};

// --- 使用 `reactive` 进行状态管理 ---
// `reactive` 用于创建对象或数组的响应式代理。
// 直接访问和修改对象的属性或数组的元素即可触发视图更新，无需 `.value`。
const userReactive = reactive({
  name: 'Alice',
  age: 30,
  skills: ['Vue', 'JavaScript']
});

/**
 * @function updateUserReactive
 * @description 更新 `userReactive` 对象的属性。
 * 直接修改 `userReactive.name` 和 `userReactive.age` 会触发视图更新。
 */
const updateUserReactive = () => {
  userReactive.name = 'Bob';
  userReactive.age = 25;
};

/**
 * @function addSkill
 * @description 向 `userReactive.skills` 数组添加新技能。
 * 直接修改数组会触发视图更新。
 */
const addSkill = () => {
  userReactive.skills.push('CSS');
};
</script>

<style scoped>
.state-management {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
  margin-top: 20px;
}

h1, h2 {
  color: #2c3e50;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
}

button:hover {
  background-color: #369f6e;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}
</style>