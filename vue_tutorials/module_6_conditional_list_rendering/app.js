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