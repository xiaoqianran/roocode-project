# 模块 5: 计算属性与侦听器

## 概念解析

在 Vue.js 中，**计算属性 (Computed Properties)** 和 **侦听器 (Watchers)** 都是用于响应数据变化的强大工具，但它们的应用场景和工作方式有所不同。

### 1. 计算属性 (Computed Properties)

-   **作用**: 用于处理复杂的逻辑，并基于响应式依赖缓存结果。只有当其依赖的响应式数据发生变化时，计算属性才会重新求值。
-   **特点**:
    -   **缓存**: 只要依赖不改变，多次访问计算属性会立即返回之前缓存的结果，而不会重新执行函数。这使得它非常高效。
    -   **声明式**: 描述的是一个“派生”的状态，而不是一个“动作”。
    -   **默认只读**: 计算属性默认只有 `getter`。如果需要双向绑定（例如与 `v-model` 结合），可以提供 `setter`。
-   **与传统 JS 对应**: 类似于在传统 JavaScript 中编写一个函数来计算派生数据，但 Vue 的计算属性提供了自动的依赖追踪和缓存机制，无需手动管理更新。

### 2. 侦听器 (Watchers)

-   **作用**: 允许我们响应数据的变化执行异步操作或开销较大的操作。当一个特定的响应式属性发生变化时，侦听器会执行一个回调函数。
-   **特点**:
    -   **通用性**: 可以监听任何响应式属性。
    -   **副作用**: 更适合执行有“副作用”的操作，例如：
        -   执行异步操作 (如 API 请求)。
        -   执行开销较大的操作 (如数据转换)。
        -   响应数据变化来执行 DOM 操作。
        -   根据数据变化进行路由跳转。
    -   **无缓存**: 每次被侦听的数据变化时，侦听器都会执行。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中手动设置 `setInterval` 或 `setTimeout` 来轮询数据变化，或者在数据更新后手动触发其他逻辑。Vue 的侦听器提供了一种更声明式和高效的方式来响应数据变化。
-   **选项**:
    -   `deep: true`: 深度侦听对象或数组内部的变化。
    -   `immediate: true`: 立即执行一次侦听器回调，即使数据在组件创建时没有变化。

### 计算属性 vs 侦听器

-   **计算属性**: 适用于需要根据现有响应式数据派生出新数据，并且希望结果被缓存的场景。它是一个“值”。
-   **侦听器**: 适用于当数据变化时需要执行一些“副作用”操作的场景，例如异步请求、复杂的逻辑处理等。它是一个“动作”。

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 5: 计算属性与侦听器</title>
    <!-- 引入 Vue 3 CDN -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }
        #app {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: left;
            max-width: 600px;
            width: 90%;
        }
        h1, h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        input[type="text"] {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .output {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
            word-wrap: break-word;
            font-size: 1.1em;
            color: #333;
        }
        .warning {
            color: orange;
            font-weight: bold;
        }
        .info {
            color: blue;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- Vue 将在这里渲染内容 -->
    </div>

    <!-- 引入 Vue 应用的 JavaScript 文件 -->
    <script src="app.js"></script>
</body>
</html>
```

### `app.js`

```javascript
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
```

-   **Linter 警告说明**: 在 `app.js` 中，您可能会看到关于模板字符串内部的 TypeScript linter 警告。这是因为 linter 尝试将 Vue 模板语法解析为 TypeScript/JSX，而它不理解 Vue 的特定语法。**请放心，这并不会影响代码在浏览器中的实际运行，因为 Vue CDN 会正确解析这些模板。**

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  尝试修改名和姓，观察全名和总价的变化，并注意控制台的日志输出。
4.  在“问一个问题”输入框中输入内容，观察答案的变化和控制台日志。
5.  修改商品数量，观察总价和控制台日志。

## 总结

计算属性和侦听器是 Vue 响应式系统的重要组成部分。计算属性用于高效地派生新数据并进行缓存，而侦听器则用于在特定数据变化时执行副作用操作。理解它们的区别和适用场景，能够帮助您编写更高效、更可维护的 Vue 应用。