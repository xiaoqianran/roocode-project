// app.js

// 模块 5: 计算属性与侦听器

const AppRootComponent = {
    data() {
        return {
            // 计算属性依赖的数据
            firstName: "John",
            lastName: "Doe",
            items: [
                { name: "Apple", price: 1.0, quantity: 2 },
                { name: "Banana", price: 0.5, quantity: 3 },
                { name: "Orange", price: 1.2, quantity: 1 }
            ],

            // 侦听器依赖的数据
            question: "",
            answer: "我无法回答你的问题，直到你停止输入...",
            typingTimer: null, // 用于防抖
            searchQuery: "",
            searchResults: []
        };
    },
    // 计算属性 (Computed Properties)
    // 它们是基于它们的响应式依赖进行缓存的。
    // 只有当它们的依赖发生改变时才会重新求值。
    computed: {
        // 示例 1: 简单的字符串拼接
        fullName() {
            console.log("计算属性: fullName 被重新计算");
            return this.firstName + " " + this.lastName;
        },
        // 示例 2: 复杂逻辑，计算总价
        totalPrice() {
            console.log("计算属性: totalPrice 被重新计算");
            return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        },
        // 示例 3: 可写计算属性 (getter 和 setter)
        // 允许通过 v-model 双向绑定
        reversedMessage: {
            get() {
                return this.question.split('').reverse().join('');
            },
            set(newValue) {
                // 当 reversedMessage 被设置时，更新 question
                this.question = newValue.split('').reverse().join('');
            }
        }
    },
    // 侦听器 (Watchers)
    // 允许我们响应数据的变化执行异步操作或开销较大的操作。
    // 它们是通用的，可以监听任何响应式属性。
    watch: {
        // 示例 1: 监听单个属性
        question(newQuestion, oldQuestion) {
            this.answer = "正在思考...";
            // 清除之前的定时器，实现防抖
            if (this.typingTimer) {
                clearTimeout(this.typingTimer);
            }
            // 模拟异步操作（例如：API 请求）
            this.typingTimer = setTimeout(() => {
                if (newQuestion.includes('Vue')) {
                    this.answer = "Vue.js 是一个渐进式 JavaScript 框架。";
                } else if (newQuestion.includes('JavaScript')) {
                    this.answer = "JavaScript 是一种高级的、解释型的编程语言。";
                } else if (newQuestion === "") {
                    this.answer = "请问一个问题...";
                } else {
                    this.answer = "我不知道这个问题的答案。";
                }
            }, 500); // 500ms 后执行
            console.log(`侦听器: question 从 "${oldQuestion}" 变为 "${newQuestion}"`);
        },
        // 示例 2: 深度侦听对象属性
        // 当对象内部的属性发生变化时触发
        items: {
            handler(newItems, oldItems) {
                console.log("侦听器: items 数组发生变化 (深度侦听)");
                // 可以在这里执行一些副作用，例如保存到 localStorage
            },
            deep: true, // 开启深度侦听
            immediate: true // 立即执行一次 handler
        },
        // 示例 3: 监听路由变化 (常见用例)
        // $route(to, from) {
        //     // 当路由变化时执行逻辑
        // }
    },
    template: `
        <div id="app-content">
            <h1>Vue 计算属性与侦听器示例</h1>

            <h2>1. 计算属性 (Computed Properties)</h2>
            <label for="firstNameInput">名:</label>
            <input type="text" id="firstNameInput" v-model="firstName">
            <label for="lastNameInput">姓:</label>
            <input type="text" id="lastNameInput" v-model="lastName">
            <p class="output">全名: <strong>{{ fullName }}</strong></p>
            <p class="output">商品总价: <strong>￥{{ totalPrice }}</strong></p>
            <p class="info">
                (打开控制台查看 "计算属性: ... 被重新计算" 的日志，
                只有当依赖数据 (名/姓/商品) 变化时才会触发)
            </p>
            <hr>

            <h2>2. 可写计算属性 (Writable Computed)</h2>
            <label for="questionInput">输入问题 (可写计算属性):</label>
            <input type="text" id="questionInput" v-model="reversedMessage" placeholder="输入一些文本...">
            <p class="output">原始问题 (通过可写计算属性更新): <strong>{{ question }}</strong></p>
            <p class="output">反转后的消息 (计算属性): <strong>{{ reversedMessage }}</strong></p>
            <hr>

            <h2>3. 侦听器 (Watchers)</h2>
            <label for="watcherQuestion">问一个问题 (侦听器):</label>
            <input type="text" id="watcherQuestion" v-model="question" placeholder="输入你的问题...">
            <p class="output">答案: <span :class="{ 'warning': answer === '正在思考...' }">{{ answer }}</span></p>
            <p class="info">
                (在输入框中停止输入 0.5 秒后，侦听器会模拟异步请求并给出答案。
                打开控制台查看 "侦听器: question ..." 的日志)
            </p>
            <hr>

            <h2>4. 侦听器深度监听 (Deep Watchers)</h2>
            <p>修改商品数量，观察控制台日志:</p>
            <ul>
                <li v-for="(item, index) in items" :key="index">
                    {{ item.name }} (￥{{ item.price }}) - 数量:
                    <input type="number" v-model.number="item.quantity" min="0" style="width: 60px;">
                </li>
            </ul>
            <p class="info">
                (修改数量时，totalPrice 计算属性和 items 侦听器都会触发)
            </p>
            <hr>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 5: 计算属性与侦听器示例已加载。");