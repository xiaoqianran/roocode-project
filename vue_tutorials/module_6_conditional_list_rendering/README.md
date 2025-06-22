# 模块 6: 条件渲染与列表渲染

## 概念解析

在 Vue.js 中，**条件渲染 (Conditional Rendering)** 和 **列表渲染 (List Rendering)** 是两种非常重要的指令，它们允许我们根据数据动态地控制 DOM 元素的显示和重复渲染。

### 1. 条件渲染 (Conditional Rendering)

条件渲染允许我们根据表达式的真假来决定一个元素或组件是否被渲染。

-   **`v-if`, `v-else-if`, `v-else`**:
    -   **作用**: 基于条件**完全销毁或重建**元素及其组件。当条件为假时，元素不会被渲染到 DOM 中。
    -   **特点**: 具有更高的切换开销，因为它们会销毁和重建 DOM 元素。适用于不经常切换的场景。
    -   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `if/else` 语句来手动添加或移除 DOM 元素 (`element.remove()`, `document.createElement()`, `appendChild()`)。

-   **`v-show`**:
    -   **作用**: 总是渲染元素，但通过切换元素的 CSS `display` 属性来控制其可见性。
    -   **特点**: 具有更低的初始渲染开销，但更高的切换开销（因为元素始终存在于 DOM 中）。适用于频繁切换的场景。
    -   **与传统 JS 对应**: 类似于传统 JavaScript 中通过修改 `element.style.display = 'none'` 或 `element.style.display = 'block'` 来控制元素的显示/隐藏。

-   **`v-if` vs `v-show` 总结**:
    -   `v-if` 是“真实的”条件渲染，因为它会确保条件块在切换时销毁或重建。
    -   `v-show` 只是简单地切换元素的 CSS `display` 属性。

### 2. 列表渲染 (List Rendering) - `v-for`

列表渲染允许我们基于一个数组或对象来渲染一个元素列表。

-   **作用**: 遍历数组或对象的属性，为每个项渲染一个模板块。
-   **语法**:
    -   遍历数组: `v-for="item in items"` 或 `v-for="(item, index) in items"`
    -   遍历对象: `v-for="(value, key, index) in object"`
    -   遍历数字范围: `v-for="n in 10"` (从 1 到 10)
-   **`key` 属性**:
    -   **重要性**: 当使用 `v-for` 时，**总是需要为每个项提供一个唯一的 `key` 属性**。`key` 帮助 Vue 识别列表中的每个节点的唯一性，从而高效地更新、添加或删除元素。
    -   **作用**: Vue 会使用 `key` 来跟踪每个节点的身份，从而重用和重新排序现有元素，而不是从头开始渲染。这对于性能优化和状态维护至关重要。
    -   **选择 `key`**: 理想情况下，`key` 应该是每个列表项的唯一 ID。如果数据项没有稳定 ID，可以使用索引 `index`，但当列表项的顺序可能改变时，这可能会导致性能问题或组件内部状态问题。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `for` 循环、`forEach` 数组方法或 `map` 方法来遍历数据，然后手动创建 DOM 元素并将其插入到页面中。Vue 的 `v-for` 自动化了这一重复性工作。

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 6: 条件渲染与列表渲染</title>
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
        button {
            padding: 8px 15px;
            font-size: 14px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            margin: 5px;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056b3;
        }
        .section {
            border: 1px solid #eee;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 6px;
            background-color: #fdfdfd;
        }
        .message {
            padding: 10px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            margin-top: 10px;
            text-align: center;
        }
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            border-color: #f5c6cb;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background-color: #e9ecef;
            margin-bottom: 8px;
            padding: 10px;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        li span {
            font-weight: bold;
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

// 模块 6: 条件渲染与列表渲染

const AppRootComponent = {
    data() {
        return {
            // 条件渲染数据
            isLoggedIn: true,
            userRole: 'guest', // 'admin', 'user', 'guest'
            showMessage: true,
            error: null,

            // 列表渲染数据
            todos: [
                { id: 1, text: '学习 Vue 基础', completed: false },
                { id: 2, text: '构建一个小型应用', completed: false },
                { id: 3, text: '阅读 Vue 文档', completed: true }
            ],
            users: {
                'john': { name: 'John Doe', age: 30 },
                'jane': { name: 'Jane Smith', age: 25 }
            },
            numbers: [1, 2, 3, 4, 5]
        };
    },
    methods: {
        toggleLogin() {
            this.isLoggedIn = !this.isLoggedIn;
            this.error = null; // 切换登录状态时清除错误
        },
        changeRole(role) {
            this.userRole = role;
        },
        toggleMessage() {
            this.showMessage = !this.showMessage;
        },
        simulateError() {
            this.error = "加载数据失败，请稍后再试。";
        },
        clearError() {
            this.error = null;
        },
        addTodo() {
            const newId = this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
            this.todos.push({ id: newId, text: `新任务 ${newId}`, completed: false });
        },
        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        toggleTodoCompletion(id) {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
    template: `
        <div id="app-content">
            <h1>Vue 条件渲染与列表渲染示例</h1>

            <div class="section">
                <h2>1. 条件渲染 (Conditional Rendering)</h2>
                <button @click="toggleLogin">切换登录状态 (当前: {{ isLoggedIn ? '已登录' : '未登录' }})</button>
                <button @click="changeRole('admin')">设为管理员</button>
                <button @click="changeRole('user')">设为普通用户</button>
                <button @click="changeRole('guest')">设为访客</button>
                <p>当前角色: <strong>{{ userRole }}</strong></p>

                <h3>v-if, v-else-if, v-else (完全销毁/重建元素)</h3>
                <div v-if="isLoggedIn" class="message">
                    欢迎回来，您已登录！
                </div>
                <div v-else-if="userRole === 'admin'" class="message">
                    欢迎管理员！您有特殊权限。
                </div>
                <div v-else-if="userRole === 'user'" class="message">
                    欢迎普通用户！
                </div>
                <div v-else class="message error-message">
                    请登录以访问更多功能。
                </div>
                <hr>

                <h3>v-show (基于 CSS 切换显示/隐藏)</h3>
                <button @click="toggleMessage">切换消息显示 (当前: {{ showMessage ? '显示' : '隐藏' }})</button>
                <p v-show="showMessage" class="message">
                    这条消息使用 v-show 控制，它总是渲染在 DOM 中，只是通过 CSS display 属性切换可见性。
                </p>
                <hr>

                <h3>结合 v-if 和 v-for (不推荐直接在同一元素上使用)</h3>
                <button @click="simulateError">模拟错误</button>
                <button @click="clearError">清除错误</button>
                <p v-if="error" class="message error-message">{{ error }}</p>
            </div>

            <div class="section">
                <h2>2. 列表渲染 (List Rendering) - v-for</h2>
                <button @click="addTodo">添加任务</button>

                <h3>遍历数组 (Array)</h3>
                <h4>待办事项列表:</h4>
                <ul>
                    <li v-for="(todo, index) in todos" :key="todo.id">
                        <input type="checkbox" :checked="todo.completed" @change="toggleTodoCompletion(todo.id)">
                        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
                            {{ index + 1 }}. {{ todo.text }}
                        </span>
                        <button @click="removeTodo(todo.id)">删除</button>
                    </li>
                </ul>
                <p v-if="todos.length === 0">没有待办事项。</p>
                <hr>

                <h3>遍历对象 (Object)</h3>
                <h4>用户信息:</h4>
                <ul>
                    <li v-for="(value, key, index) in users" :key="key">
                        {{ index + 1 }}. {{ key }}: {{ value.name }} ({{ value.age }} 岁)
                    </li>
                </ul>
                <hr>

                <h3>遍历数字范围 (Range)</h3>
                <h4>数字 1 到 5:</h4>
                <ul>
                    <li v-for="n in numbers" :key="n">
                        {{ n }}
                    </li>
                </ul>
            </div>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 6: 条件渲染与列表渲染示例已加载。");
```

-   **Linter 警告说明**: 在 `app.js` 中，您可能会看到关于模板字符串内部的 TypeScript linter 警告。这是因为 linter 尝试将 Vue 模板语法解析为 TypeScript/JSX，而它不理解 Vue 的特定语法。**请放心，这并不会影响代码在浏览器中的实际运行，因为 Vue CDN 会正确解析这些模板。**

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  尝试点击按钮切换登录状态和用户角色，观察条件渲染的效果。
4.  尝试添加、删除和切换待办事项的完成状态，观察列表渲染的效果。

## 总结

条件渲染和列表渲染是构建动态和响应式用户界面的基石。`v-if` 和 `v-show` 提供了灵活的元素显示控制，而 `v-for` 则使得渲染数据列表变得简单高效。正确使用 `key` 属性对于 `v-for` 的性能和稳定性至关重要。