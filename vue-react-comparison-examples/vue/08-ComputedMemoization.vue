<!-- 08-ComputedMemoization.vue: Vue 3 计算属性示例 -->
<template>
  <div class="computed-memoization">
    <h1>Vue 3 计算属性 (`computed`)</h1>

    <h2>基本计算属性</h2>
    <p>原始价格: {{ price }}</p>
    <p>数量: {{ quantity }}</p>
    <p>总价 (计算属性): {{ totalPrice }}</p>
    <button @click="changePrice">改变价格</button>
    <button @click="changeQuantity">改变数量</button>

    <h2>计算属性的 Setter</h2>
    <p>全名: {{ fullName }}</p>
    <input type="text" v-model="fullName" placeholder="修改全名" />

    <h2>计算属性与方法对比</h2>
    <p>计算属性 (反转消息): {{ reversedMessageComputed }}</p>
    <p>方法 (反转消息): {{ reversedMessageMethod() }}</p>
    <button @click="changeMessage">改变消息</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

/**
 * @module 08-ComputedMemoization
 * @description Vue 3 计算属性示例，对比 `computed`。
 */

// --- 基本计算属性 ---
const price = ref(10);
const quantity = ref(2);

/**
 * @computed totalPrice
 * @description 计算属性：根据 `price` 和 `quantity` 计算总价。
 * 只有当其依赖的响应式数据 (price, quantity) 发生变化时，才会重新计算。
 * 具有缓存特性。
 */
const totalPrice = computed(() => {
  console.log('计算属性: totalPrice 重新计算');
  return price.value * quantity.value;
});

/**
 * @function changePrice
 * @description 改变价格。
 * 触发 `totalPrice` 计算属性的重新计算。
 */
const changePrice = () => {
  price.value += 5;
};

/**
 * @function changeQuantity
 * @description 改变数量。
 * 触发 `totalPrice` 计算属性的重新计算。
 */
const changeQuantity = () => {
  quantity.value += 1;
};

// --- 计算属性的 Setter ---
const firstName = ref('John');
const lastName = ref('Doe');

/**
 * @computed fullName
 * @description 具有 getter 和 setter 的计算属性。
 * 当 `fullName` 被读取时，执行 getter；当 `fullName` 被修改时，执行 setter。
 */
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  set(newValue) {
    const names = newValue.split(' ');
    firstName.value = names[0] || '';
    lastName.value = names[1] || '';
  }
});

// --- 计算属性与方法对比 ---
const message = ref('Hello Vue');

/**
 * @computed reversedMessageComputed
 * @description 计算属性：反转 `message`。
 * 具有缓存，只有 `message` 变化时才重新计算。
 */
const reversedMessageComputed = computed(() => {
  console.log('计算属性: reversedMessageComputed 重新计算');
  return message.value.split('').reverse().join('');
});

/**
 * @function reversedMessageMethod
 * @description 方法：反转 `message`。
 * 每次组件重新渲染时都会执行，没有缓存。
 * @returns {string} 反转后的消息。
 */
const reversedMessageMethod = () => {
  console.log('方法: reversedMessageMethod 执行');
  return message.value.split('').reverse().join('');
};

/**
 * @function changeMessage
 * @description 改变消息。
 * 触发 `reversedMessageComputed` 重新计算，并导致 `reversedMessageMethod` 重新执行。
 */
const changeMessage = () => {
  message.value = message.value === 'Hello Vue' ? 'World Vue' : 'Hello Vue';
};
</script>

<style scoped>
.computed-memoization {
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

input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 200px;
}
</style>