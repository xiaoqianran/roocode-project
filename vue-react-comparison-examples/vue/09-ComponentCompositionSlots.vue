<!-- 09-ComponentCompositionSlots.vue: Vue 3 组件组合与插槽示例 -->
<template>
  <div class="component-composition-slots">
    <h1>Vue 3 组件组合与插槽</h1>

    <h2>默认插槽</h2>
    <CardComponentVue>
      <!-- 默认插槽内容 -->
      <p>这是通过<b>默认插槽</b>传递到卡片组件的内容。</p>
      <button>点击我</button>
    </CardComponentVue>

    <h2>具名插槽</h2>
    <CardComponentVue>
      <!-- 具名插槽内容 -->
      <template #header>
        <h3>卡片头部 (具名插槽)</h3>
      </template>
      <template #default>
        <p>这是通过<b>默认插槽</b>传递到卡片组件的主体内容。</p>
      </template>
      <template #footer>
        <p>卡片底部 (具名插槽)</p>
        <button>了解更多</button>
      </template>
    </CardComponentVue>

    <h2>作用域插槽 (传递数据给插槽内容)</h2>
    <ListComponentVue :items="['Apple', 'Banana', 'Orange']">
      <template #item="{ item, index }">
        <p><b>{{ index + 1 }}.</b> {{ item }} (来自作用域插槽)</p>
      </template>
    </ListComponentVue>
  </div>
</template>

<script setup>
import CardComponentVue from './CardComponentVue.vue'; // 导入卡片组件
import ListComponentVue from './ListComponentVue.vue'; // 导入列表组件

/**
 * @module 09-ComponentCompositionSlots
 * @description Vue 3 组件组合与插槽示例。
 * 演示默认插槽、具名插槽和作用域插槽的用法。
 */
</script>

<script>
// CardComponentVue.vue: Vue 3 卡片组件示例 (用于演示插槽)
</script>

<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot> <!-- 默认插槽 -->
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
// `useSlots` 可以在 `<script setup>` 中访问插槽信息，
// 但这里为了简洁，直接在模板中使用 `$slots`。
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.card footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
}
</style>

<script>
// ListComponentVue.vue: Vue 3 列表组件示例 (用于演示作用域插槽)
</script>

<template>
  <ul class="item-list">
    <li v-for="(item, index) in items" :key="index">
      <!-- 作用域插槽：将 `item` 和 `index` 数据暴露给父组件的插槽内容 -->
      <slot name="item" :item="item" :index="index"></slot>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';

/**
 * @module ListComponentVue
 * @description Vue 3 列表组件示例。
 * 演示如何定义作用域插槽，将组件内部数据暴露给父组件的插槽内容。
 */

// 定义组件接收的 props
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.item-list {
  list-style-type: none;
  padding: 0;
}

.item-list li {
  background-color: #e9f7ef;
  border: 1px solid #d4edda;
  padding: 8px 12px;
  margin-bottom: 5px;
  border-radius: 4px;
}
</style>

<style scoped>
.component-composition-slots {
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
</style>