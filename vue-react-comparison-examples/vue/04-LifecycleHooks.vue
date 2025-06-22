<!-- 04-LifecycleHooks.vue: Vue 3 生命周期钩子示例 -->
<template>
  <div class="lifecycle-hooks">
    <h1>Vue 3 生命周期钩子</h1>
    <p>计数器: {{ count }}</p>
    <button @click="increment">增加计数</button>
    <p v-if="showChild">
      <ChildComponentLifecycle />
    </p>
    <button @click="toggleChild">
      {{ showChild ? '卸载子组件' : '挂载子组件' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';
import ChildComponentLifecycle from './ChildComponentLifecycle.vue'; // 导入子组件

/**
 * @module 04-LifecycleHooks
 * @description Vue 3 生命周期钩子示例。
 * 演示 `onMounted`, `onUpdated`, `onUnmounted` 的用法。
 */

const count = ref(0);
const showChild = ref(false);

/**
 * @function increment
 * @description 增加计数器值。
 * 每次更新 `count` 都会触发 `onUpdated` 钩子。
 */
const increment = () => {
  count.value++;
};

/**
 * @function toggleChild
 * @description 切换子组件的挂载/卸载状态。
 * 挂载时触发子组件的 `onMounted`，卸载时触发 `onUnmounted`。
 */
const toggleChild = () => {
  showChild.value = !showChild.value;
};

// --- 生命周期钩子 ---

// `onMounted`：组件挂载到 DOM 后调用。
onMounted(() => {
  console.log('父组件: onMounted - 组件已挂载到 DOM。');
});

// `onUpdated`：组件因响应式状态变更而更新 DOM 后调用。
onUpdated(() => {
  console.log('父组件: onUpdated - 组件已更新。当前计数:', count.value);
});

// `onUnmounted`：组件从 DOM 卸载后调用。
onUnmounted(() => {
  console.log('父组件: onUnmounted - 组件已卸载。');
});
</script>

<script>
// ChildComponentLifecycle.vue: Vue 3 子组件生命周期示例
</script>

<template>
  <div class="child-lifecycle-component">
    <h3>子组件生命周期 (Vue)</h3>
    <p>子组件计数: {{ childCount }}</p>
    <button @click="incrementChild">增加子组件计数</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';

/**
 * @module ChildComponentLifecycle
 * @description Vue 3 子组件生命周期钩子示例。
 */

const childCount = ref(0);

/**
 * @function incrementChild
 * @description 增加子组件计数器值。
 */
const incrementChild = () => {
  childCount.value++;
};

// `onMounted`：子组件挂载到 DOM 后调用。
onMounted(() => {
  console.log('子组件: onMounted - 子组件已挂载。');
});

// `onUpdated`：子组件因响应式状态变更而更新 DOM 后调用。
onUpdated(() => {
  console.log('子组件: onUpdated - 子组件已更新。当前子组件计数:', childCount.value);
});

// `onUnmounted`：子组件从 DOM 卸载后调用。
onUnmounted(() => {
  console.log('子组件: onUnmounted - 子组件已卸载。');
});
</script>

<style scoped>
.lifecycle-hooks {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
  margin-top: 20px;
}

.child-lifecycle-component {
  border: 1px dashed #42b983;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
  background-color: #f0fff0;
}

h1, h3 {
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
</style>