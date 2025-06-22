<!-- 07-EventHandling.vue: Vue 3 事件处理示例 -->
<template>
  <div class="event-handling">
    <h1>Vue 3 事件处理</h1>

    <h2>基本点击事件 (`@click`)</h2>
    <button @click="handleClick">点击我</button>
    <p>点击次数: {{ clickCount }}</p>

    <h2>带参数的事件处理 (`@click="handleParamClick(arg)"`)</h2>
    <button @click="handleParamClick('Hello Vue!')">带参数点击</button>

    <h2>事件修饰符 (`.stop`, `.prevent`, `.once`, `.self`)</h2>
    <div class="outer-box" @click="handleOuterClick">
      <p>外部盒子 (点击我)</p>
      <button @click.stop="handleInnerClick">内部按钮 (阻止冒泡)</button>
      <a href="https://vuejs.org/" @click.prevent="handleLinkClick">阻止默认行为的链接</a>
      <button @click.once="handleOnceClick">只点击一次</button>
      <div class="inner-box" @click.self="handleSelfClick">
        <p>内部盒子 (只有点击自身才触发)</p>
        <button @click="handleInnerClick">内部按钮</button>
      </div>
    </div>

    <h2>表单输入事件 (`v-model`, `@input`, `@change`)</h2>
    <input type="text" v-model="inputValue" placeholder="使用 v-model" />
    <p>`v-model` 值: {{ inputValue }}</p>

    <input type="text" :value="inputManualValue" @input="handleInput" placeholder="手动 @input" />
    <p>手动 `@input` 值: {{ inputManualValue }}</p>

    <select v-model="selectedOption">
      <option disabled value="">请选择</option>
      <option>Option A</option>
      <option>Option B</option>
      <option>Option C</option>
    </select>
    <p>选中项: {{ selectedOption }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * @module 07-EventHandling
 * @description Vue 3 事件处理示例，对比 `@` 或 `v-on`。
 */

// --- 基本点击事件 ---
const clickCount = ref(0);

/**
 * @function handleClick
 * @description 处理基本点击事件。
 */
const handleClick = () => {
  clickCount.value++;
  console.log('按钮被点击了！');
};

/**
 * @function handleParamClick
 * @description 处理带参数的点击事件。
 * @param {string} message - 传递的参数。
 */
const handleParamClick = (message) => {
  console.log('带参数的按钮被点击了！消息:', message);
  alert(message);
};

// --- 事件修饰符 ---

/**
 * @function handleOuterClick
 * @description 处理外部盒子的点击事件。
 */
const handleOuterClick = () => {
  console.log('外部盒子被点击了！');
};

/**
 * @function handleInnerClick
 * @description 处理内部按钮的点击事件。
 * `@click.stop` 会阻止事件冒泡到父元素。
 */
const handleInnerClick = () => {
  console.log('内部按钮被点击了！(事件冒泡被阻止)');
};

/**
 * @function handleLinkClick
 * @description 处理链接点击事件。
 * `@click.prevent` 会阻止链接的默认跳转行为。
 */
const handleLinkClick = () => {
  console.log('链接被点击了！(默认行为被阻止)');
  alert('链接默认行为已被阻止！');
};

/**
 * @function handleOnceClick
 * @description 处理只触发一次的点击事件。
 * `@click.once` 确保事件处理函数只执行一次。
 */
const handleOnceClick = () => {
  console.log('这个按钮只能点击一次！');
  alert('这个按钮只能点击一次！');
};

/**
 * @function handleSelfClick
 * @description 处理只有点击自身才触发的事件。
 * `@click.self` 确保只有当事件是从该元素本身触发时才执行，而不是从其子元素冒泡上来。
 */
const handleSelfClick = () => {
  console.log('内部盒子自身被点击了！');
};

// --- 表单输入事件 ---
const inputValue = ref('');
const inputManualValue = ref('');
const selectedOption = ref('');

/**
 * @function handleInput
 * @description 手动处理输入框的 `input` 事件。
 * @param {object} event - 事件对象。
 */
const handleInput = (event) => {
  inputManualValue.value = event.target.value;
  console.log('手动输入值:', inputManualValue.value);
};
</script>

<style scoped>
.event-handling {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
  margin-top: 20px;
}

h1, h2 {
  color: #2c3e50;
}

button, a {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block; /* For anchor tag */
  text-decoration: none; /* For anchor tag */
}

button:hover, a:hover {
  background-color: #369f6e;
}

.outer-box {
  border: 2px solid #2c3e50;
  padding: 20px;
  margin-top: 15px;
  background-color: #f0fff0;
}

.inner-box {
  border: 1px dashed #42b983;
  padding: 10px;
  margin-top: 10px;
  background-color: #f8fff8;
}

input[type="text"], select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>