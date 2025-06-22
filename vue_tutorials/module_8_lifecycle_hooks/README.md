# 模块 8: 生命周期钩子

## 概念解析

每个 Vue 实例或组件在被创建时都会经历一系列的初始化步骤，例如设置数据观测、编译模板、将实例挂载到 DOM、以及在数据变化时更新 DOM。同时，当实例不再需要时，它也会被销毁。在这个过程中，Vue 会运行一些特定的函数，这些函数被称为**生命周期钩子 (Lifecycle Hooks)**。

生命周期钩子允许我们在实例或组件生命周期的不同阶段执行我们自己的代码。

### 主要生命周期钩子 (Vue 3 Options API)

Vue 3 的生命周期钩子名称与 Vue 2 略有不同，但概念是相似的。

#### 1. 创建阶段 (Creation)

-   **`beforeCreate()`**:
    -   **触发时机**: 实例刚被创建，但数据观测 (data) 和事件/方法配置 (methods) 都尚未初始化。
    -   **用途**: 很少使用，因为此时无法访问 `data` 和 `methods`。
-   **`created()`**:
    -   **触发时机**: 实例创建完成，数据观测和事件/方法配置已完成。但此时 DOM 尚未挂载。
    -   **用途**: 适合进行数据初始化、异步请求（如 API 调用）、设置响应式数据等。此时可以访问 `this.data` 和 `this.methods`。

#### 2. 挂载阶段 (Mounting)

-   **`beforeMount()`**:
    -   **触发时机**: 模板编译完成，但尚未渲染到 DOM。
    -   **用途**: 可以在这里对模板进行最后的修改，但此时无法访问到真实的 DOM 元素。
-   **`mounted()`**:
    -   **触发时机**: 实例已挂载到 DOM，并且所有子组件也已挂载。
    -   **用途**: 适合进行 DOM 操作、集成第三方库（如 D3.js、ECharts）、发送网络请求（如果需要在 DOM 存在后才发送）等。此时可以访问 `this.$el`。

#### 3. 更新阶段 (Updating)

-   **`beforeUpdate()`**:
    -   **触发时机**: 响应式数据发生变化，但在 DOM 重新渲染之前。
    -   **用途**: 可以在这里访问更新前的 DOM 状态。
-   **`updated()`**:
    -   **触发时机**: 响应式数据发生变化，并且 DOM 已重新渲染完成。
    -   **用途**: 适合进行依赖于最新 DOM 状态的操作。避免在此钩子中修改数据，否则可能导致无限循环更新。

#### 4. 卸载阶段 (Unmounting)

-   **`beforeUnmount()`**:
    -   **触发时机**: 实例被销毁之前。
    -   **用途**: 适合进行清理工作，例如清除定时器、取消订阅、移除事件监听器等，以防止内存泄漏。此时组件实例仍然完全可用。
-   **`unmounted()`**:
    -   **触发时机**: 实例已被销毁，所有指令和事件监听器都被移除，所有子组件都被卸载。
    -   **用途**: 此时组件已完全从 DOM 中移除，无法再进行任何操作。

### 生命周期图示 (简化版)

```
┌───────────────────┐
│     new Vue()     │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   beforeCreate()  │ (实例创建前)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     created()     │ (数据观测/方法配置完成，DOM 未挂载)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   beforeMount()   │ (模板编译完成，DOM 未渲染)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     mounted()     │ (实例挂载到 DOM)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   数据更新/DOM更新  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   beforeUpdate()  │ (数据更新，DOM 重新渲染前)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     updated()     │ (数据更新，DOM 重新渲染后)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   beforeUnmount() │ (实例卸载前)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│    unmounted()    │ (实例已从 DOM 卸载)
└───────────────────┘
```

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 8: 生命周期钩子</title>
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
            text-align: center;
            max-width: 600px;
            width: 90%;
        }
        h1, h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            margin: 10px;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056b3;
        }
        .log-container {
            margin-top: 20px;
            padding: 15px;
            background-color: #e9ecef;
            border-radius: 5px;
            text-align: left;
            max-height: 250px;
            overflow-y: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9em;
            color: #333;
        }
        .log-container p {
            margin: 2px 0;
            padding: 2px 0;
            border-bottom: 1px dotted #ccc;
        }
        .log-container p:last-child {
            border-bottom: none;
        }
        .component-box {
            border: 1px solid #ccc;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
            background-color: #f8f8f8;
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

// 模块 8: 生命周期钩子

// 用于记录日志的数组
const logs = [];

// 辅助函数：添加日志
function addLog(message, componentName = 'Root') {
    const timestamp = new Date().toLocaleTimeString();
    logs.push(`[${timestamp}] [${componentName}] ${message}`);
    // 确保日志容器存在并更新
    const logContainer = document.getElementById('log-output');
    if (logContainer) {
        logContainer.innerHTML = logs.map(log => `<p>${log}</p>`).join('');
        logContainer.scrollTop = logContainer.scrollHeight; // 滚动到底部
    }
}

// 定义一个子组件来演示生命周期钩子
const ChildComponent = {
    name: 'ChildComponent', // 命名组件，方便调试
    data() {
        addLog("data() - 子组件数据初始化", this.$options.name);
        return {
            childMessage: "我是子组件的消息",
            intervalId: null
        };
    },
    // 1. 创建阶段
    beforeCreate() {
        addLog("beforeCreate() - 子组件实例创建前", this.$options.name);
        // 此时 data 和 methods 都不可用
    },
    created() {
        addLog("created() - 子组件实例创建后", this.$options.name);
        // 此时 data 和 methods 已可用，但 DOM 尚未挂载
        // 适合进行数据初始化、异步请求等
        this.intervalId = setInterval(() => {
            addLog("子组件定时器正在运行...", this.$options.name);
        }, 2000);
    },
    // 2. 挂载阶段
    beforeMount() {
        addLog("beforeMount() - 子组件挂载到 DOM 前", this.$options.name);
        // 此时模板已编译，但尚未渲染到 DOM
    },
    mounted() {
        addLog("mounted() - 子组件已挂载到 DOM", this.$options.name);
        // 此时组件已渲染到 DOM，可以进行 DOM 操作、集成第三方库等
        console.log("子组件 DOM 元素:", this.$el);
    },
    // 3. 更新阶段
    beforeUpdate() {
        addLog("beforeUpdate() - 子组件数据更新前", this.$options.name);
        // 此时数据已更新，但 DOM 尚未重新渲染
    },
    updated() {
        addLog("updated() - 子组件数据更新后，DOM 已更新", this.$options.name);
        // 此时 DOM 已重新渲染，可以进行依赖于最新 DOM 的操作
    },
    // 4. 卸载阶段
    beforeUnmount() {
        addLog("beforeUnmount() - 子组件卸载前", this.$options.name);
        // 此时组件实例仍然完全可用，可以进行清理工作
        clearInterval(this.intervalId); // 清除定时器
    },
    unmounted() {
        addLog("unmounted() - 子组件已从 DOM 卸载", this.$options.name);
        // 此时组件已被销毁，所有事件监听器和子组件都被移除
    },
    template: `
        <div class="component-box">
            <h3>子组件 (ChildComponent)</h3>
            <p>{{ childMessage }}</p>
            <button @click="childMessage = '子组件消息已更新！'">更新子组件消息</button>
        </div>
    `
};

// 根组件
const AppRootComponent = {
    data() {
        addLog("data() - 根组件数据初始化");
        return {
            rootMessage: "我是根组件的消息",
            showChild: true // 控制子组件的显示/隐藏，以触发其生命周期
        };
    },
    components: {
        ChildComponent
    },
    // 1. 创建阶段
    beforeCreate() {
        addLog("beforeCreate() - 根组件实例创建前");
    },
    created() {
        addLog("created() - 根组件实例创建后");
    },
    // 2. 挂载阶段
    beforeMount() {
        addLog("beforeMount() - 根组件挂载到 DOM 前");
    },
    mounted() {
        addLog("mounted() - 根组件已挂载到 DOM");
        // 模拟数据更新
        setTimeout(() => {
            this.rootMessage = "根组件消息在 3 秒后更新！";
        }, 3000);
    },
    // 3. 更新阶段
    beforeUpdate() {
        addLog("beforeUpdate() - 根组件数据更新前");
    },
    updated() {
        addLog("updated() - 根组件数据更新后，DOM 已更新");
    },
    // 4. 卸载阶段 (通常在整个应用被卸载时触发，或在组件被 v-if 移除时)
    beforeUnmount() {
        addLog("beforeUnmount() - 根组件卸载前");
    },
    unmounted() {
        addLog("unmounted() - 根组件已从 DOM 卸载");
    },
    methods: {
        toggleChild() {
            this.showChild = !this.showChild;
            addLog(`根组件: 切换子组件显示状态为 ${this.showChild}`);
        }
    },
    template: `
        <div id="app-content">
            <h1>Vue 生命周期钩子示例</h1>
            <p>{{ rootMessage }}</p>
            <button @click="rootMessage = '根组件消息手动更新！'">更新根组件消息</button>
            <button @click="toggleChild">
                {{ showChild ? '卸载子组件' : '挂载子组件' }}
            </button>

            <div v-if="showChild">
                <ChildComponent />
            </div>
            <div v-else>
                <p style="color: gray;">子组件已卸载。</p>
            </div>

            <h2>生命周期日志:</h2>
            <div id="log-output" class="log-container">
                <!-- 日志将在这里动态显示 -->
            </div>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 8: 生命周期钩子示例已加载。");
```

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  观察页面上的“生命周期日志”区域，它会实时显示根组件和子组件在不同生命周期阶段触发的日志。
4.  尝试点击“更新根组件消息”按钮，观察 `beforeUpdate` 和 `updated` 钩子的触发。
5.  点击“卸载子组件”/“挂载子组件”按钮，观察子组件的创建、挂载、卸载过程中的生命周期钩子触发情况，特别是 `beforeUnmount` 和 `unmounted`。

## 总结

生命周期钩子是 Vue 实例或组件在不同阶段执行特定逻辑的入口。理解这些钩子的触发时机和用途，对于管理组件状态、执行副作用（如网络请求、DOM 操作、清理工作）以及优化应用性能至关重要。它们是 Vue 响应式系统和组件化架构的有机组成部分。