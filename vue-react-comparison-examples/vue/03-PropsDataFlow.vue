<!-- 03-PropsDataFlow.vue: Vue 3 Props与数据流示例 -->
<template>
  <div class="props-data-flow">
    <h1>Vue 3 Props与数据流</h1>
    <p>父组件中的消息: {{ parentMessage }}</p>
    <button @click="changeParentMessage">改变父组件消息</button>

    <!-- 使用子组件，并通过 props 传递数据 -->
    <ChildComponentVue :message="parentMessage" :count="parentCount" @child-event="handleChildEvent" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponentVue from './ChildComponentVue.vue'; // 导入子组件

/**
 * @module 03-PropsDataFlow
 * @description Vue 3 Props与数据流示例。
 * 演示父组件如何向子组件传递数据 (props) 以及子组件如何向父组件通信 (emit 事件)。
 */

// 父组件的状态
const parentMessage = ref('Hello from Parent!');
const parentCount = ref(10);

/**
 * @function changeParentMessage
 * @description 改变父组件消息的方法。
 * 更新 `parentMessage` 会导致子组件的 `message` prop 更新。
 */
const changeParentMessage = () => {
  parentMessage.value = 'Updated message from Parent!';
};

/**
 * @function handleChildEvent
 * @description 处理子组件触发的事件。
 * @param {string} payload - 子组件传递过来的数据。
 */
const handleChildEvent = (payload) => {
  console.log('Received event from child with payload:', payload);
  alert(`父组件收到子组件消息: ${payload}`);
};
</script>

<script>
// ChildComponentVue.vue: Vue 3 子组件示例
// 注意：在实际项目中，子组件通常会单独放在一个文件里。
// 这里为了方便对比，将子组件定义放在同一个文件中。
</script>

<template>
  <div class="child-component">
    <h2>子组件 (Vue)</h2>
    <p>从父组件接收到的消息: {{ message }}</p>
    <p>从父组件接收到的计数: {{ count }}</p>
    <button @click="emitEvent">触发子组件事件</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

/**
 * @module ChildComponentVue
 * @description Vue 3 子组件示例。
 * 演示如何通过 `defineProps` 接收父组件传递的 props，
 * 以及如何通过 `defineEmits` 定义和触发自定义事件。
 */

// 定义组件接收的 props
// `message` 是字符串类型，`count` 是数字类型
const props = defineProps({
  message: String,
  count: Number
});

// 定义组件可以触发的事件
// 这里定义了一个名为 `child-event` 的事件
const emit = defineEmits(['child-event']);

/**
 * @function emitEvent
 * @description 触发一个名为 `child-event` 的自定义事件，并传递数据。
 * 父组件可以通过 `@child-event` 监听此事件。
 */
const emitEvent = () => {
  emit('child-event', 'Data from Child Component!');
};
</script>

<style scoped>
.props-data-flow {
  border: 1px solid #42b983;
  padding: 20px;
  border-radius: 8px;
  background-color: #e6ffe6;
  margin-top: 20px;
}

.child-component {
  border: 1px dashed #42b983;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
  background-color: #f0fff0;
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