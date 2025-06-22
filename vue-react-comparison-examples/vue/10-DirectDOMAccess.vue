<!-- 10-DirectDOMAccess.vue: Vue 3 直接 DOM 访问示例 -->
<template>
  <div class="direct-dom-access">
    <h1>Vue 3 直接 DOM 访问 (`ref` 属性)</h1>

    <h2>访问单个元素</h2>
    <input type="text" ref="myInput" placeholder="点击按钮聚焦我" />
    <button @click="focusInput">聚焦输入框</button>

    <h2>访问组件实例</h2>
    <ChildComponentDOMAccess ref="childComponentRef" />
    <button @click="callChildMethod">调用子组件方法</button>

    <h2>访问 `v-for` 中的元素列表</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index" :ref="el => { if (el) itemRefs[index] = el }">
        {{ item }}
      </li>
    </ul>
    <button @click="logAllItems">打印所有列表项</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChildComponentDOMAccess from './ChildComponentDOMAccess.vue'; // 导入子组件

/**
 * @module 10-DirectDOMAccess
 * @description Vue 3 直接 DOM 访问示例，对比 `ref` 属性。
 */

// --- 访问单个元素 ---
// 创建一个 ref 引用，用于绑定到模板中的元素
const myInput = ref(null);

/**
 * @function focusInput
 * @description 聚焦输入框。
 * 通过 `myInput.value` 访问到 DOM 元素，然后调用其 `focus()` 方法。
 */
const focusInput = () => {
  if (myInput.value) {
    myInput.value.focus();
    console.log('输入框已聚焦。');
  }
};

// --- 访问组件实例 ---
// 创建一个 ref 引用，用于绑定到模板中的子组件实例
const childComponentRef = ref(null);

/**
 * @function callChildMethod
 * @description 调用子组件的方法。
 * 通过 `childComponentRef.value` 访问到子组件实例，然后调用其暴露的方法。
 */
const callChildMethod = () => {
  if (childComponentRef.value) {
    childComponentRef.value.greet();
  }
};

// --- 访问 `v-for` 中的元素列表 ---
const items = ref(['Item 1', 'Item 2', 'Item 3']);
// 创建一个数组来存储 `v-for` 中每个元素的 ref
const itemRefs = ref([]);

// 在组件挂载后，`itemRefs` 会被填充
onMounted(() => {
  console.log('所有列表项的 DOM 元素:', itemRefs.value);
});

/**
 * @function logAllItems
 * @description 打印所有列表项的 DOM 元素。
 */
const logAllItems = () => {
  itemRefs.value.forEach((el, index) => {
    console.log(`列表项 ${index}:`, el);
  });
};
</script>

<script>
// ChildComponentDOMAccess.vue: Vue 3 子组件示例 (用于演示组件实例访问)
</script>

<template>
  <div class="child-dom-access-component">
    <h3>子组件 (DOM 访问)</h3>
    <p>这是一个子组件。</p>
  </div>
</template>

<script setup>
import { defineExpose } from 'vue';

/**
 * @module ChildComponentDOMAccess
 * @description Vue 3 子组件示例。
 * 演示如何通过 `defineExpose` 暴露组件内部的方法，以便父组件可以通过 `ref` 访问。
 */

/**
 * @function greet
 * @description 子组件内部的一个方法。
 */
const greet = () => {
  alert('Hello from Child Component!');
  console.log('子组件方法 `greet` 被调用。');
};

// 使用 `defineExpose` 暴露 `greet` 方法，使其可以通过父组件的 ref 访问
defineExpose({
  greet
});
</script>

<style scoped>
.direct-dom-access {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
  margin-top: 20px;
}

.child-dom-access-component {
  border: 1px dashed #42b983;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
  background-color: #f0fff0;
}

h1, h2, h3 {
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

input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 200px;
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