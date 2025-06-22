<!-- 05-ConditionalRendering.vue: Vue 3 条件渲染示例 -->
<template>
  <div class="conditional-rendering">
    <h1>Vue 3 条件渲染</h1>

    <h2>`v-if` (完全销毁/重建元素)</h2>
    <button @click="toggleVisibleIf">切换 `v-if` 可见性</button>
    <p v-if="isVisibleIf" class="message-box">
      这条消息通过 `v-if` 控制显示。
    </p>
    <p v-else class="message-box-else">
      `v-if` 为 false 时显示这条消息。
    </p>

    <h2>`v-show` (通过 CSS `display` 切换)</h2>
    <button @click="toggleVisibleShow">切换 `v-show` 可见性</button>
    <p v-show="isVisibleShow" class="message-box">
      这条消息通过 `v-show` 控制显示。
    </p>

    <h2>多个 `v-if` / `v-else-if` / `v-else`</h2>
    <input type="number" v-model.number="score" placeholder="输入分数 (0-100)" />
    <p v-if="score >= 90" class="grade-a">
      成绩: 优秀 (A)
    </p>
    <p v-else-if="score >= 75" class="grade-b">
      成绩: 良好 (B)
    </p>
    <p v-else-if="score >= 60" class="grade-c">
      成绩: 及格 (C)
    </p>
    <p v-else class="grade-f">
      成绩: 不及格 (F)
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * @module 05-ConditionalRendering
 * @description Vue 3 条件渲染示例，对比 `v-if` 和 `v-show`。
 */

// `v-if` 相关的状态
const isVisibleIf = ref(true);

/**
 * @function toggleVisibleIf
 * @description 切换 `isVisibleIf` 的布尔值。
 * 控制 `v-if` 元素的显示与隐藏。
 */
const toggleVisibleIf = () => {
  isVisibleIf.value = !isVisibleIf.value;
};

// `v-show` 相关的状态
const isVisibleShow = ref(true);

/**
 * @function toggleVisibleShow
 * @description 切换 `isVisibleShow` 的布尔值。
 * 控制 `v-show` 元素的显示与隐藏。
 */
const toggleVisibleShow = () => {
  isVisibleShow.value = !isVisibleShow.value;
};

// 分数状态，用于多条件渲染
const score = ref(70);
</script>

<style scoped>
.conditional-rendering {
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

.message-box {
  background-color: #d4edda;
  border: 1px solid #28a745;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  color: #155724;
}

.message-box-else {
  background-color: #f8d7da;
  border: 1px solid #dc3545;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  color: #721c24;
}

input[type="number"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.grade-a { color: #28a745; font-weight: bold; }
.grade-b { color: #007bff; font-weight: bold; }
.grade-c { color: #ffc107; font-weight: bold; }
.grade-f { color: #dc3545; font-weight: bold; }
</style>