# 模块 1: Vue 实例与应用挂载

## 概念解析

本模块介绍了 Vue.js 应用的起点：**Vue 实例**（在 Vue 3 中称为 **Vue 应用实例**）以及如何将其**挂载**到 DOM 元素上。这是所有 Vue 应用的基础。

### Vue 应用实例 (`Vue.createApp()`)

-   **作用**: `Vue.createApp()` 是 Vue 3 中创建应用实例的入口。它接收一个根组件（一个组件选项对象）作为参数。这个根组件定义了整个 Vue 应用的初始数据、模板和行为。
-   **与传统 JS 对应**: 在传统 JavaScript 开发中，我们通常会直接操作 `document` 对象来创建和管理 DOM 元素。Vue 应用实例可以看作是传统 JS 中管理整个应用状态和行为的“主控制器”或“入口点”，它将所有响应式数据和组件逻辑封装起来。

### 应用挂载 (`.mount()`)

-   **作用**: `app.mount('#app')` 方法用于将创建的 Vue 应用实例“连接”到页面上的一个实际 DOM 元素。一旦挂载完成，Vue 就会完全控制这个 DOM 元素及其内部的所有内容。Vue 会将根组件的模板渲染到这个挂载点内。
-   **与传统 JS 对应**:
    -   **HTML**: `<div id="app"></div>` 类似于传统 HTML 中预留的一个容器，等待 JavaScript 来填充内容。
    -   **JavaScript**: 传统上，我们可能会使用 `document.getElementById('app').innerHTML = '...'` 或 `appendChild()` 等方法来动态地向这个容器中添加内容。Vue 的 `mount` 方法自动化并响应式地完成了这一过程。

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 1: Vue 实例与应用挂载</title>
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
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <!-- Vue 应用的挂载点 -->
    <div id="app">
        <!-- Vue 将在这里渲染内容 -->
    </div>

    <!-- 引入 Vue 应用的 JavaScript 文件 -->
    <script src="app.js"></script>
</body>
</html>
```

-   **关键点**:
    -   `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`: 引入 Vue 3 的 CDN 版本，使得 `Vue` 全局对象可用。
    -   `<div id="app"></div>`: 这是 Vue 应用的挂载点。Vue 会在这个 `div` 内部渲染其所有内容。
    -   `<script src="app.js"></script>`: 引入我们编写的 Vue 应用逻辑。

### `app.js`

```javascript
// app.js

// 模块 1: Vue 实例与应用挂载

// 1. 定义 Vue 应用的根组件
// 这是一个简单的组件选项对象，包含数据和模板
const AppRootComponent = {
    // data 选项返回一个对象，其中包含组件的响应式数据
    data() {
        return {
            message: "Hello Vue 3!",
            greeting: "欢迎学习 Vue.js！"
        };
    },
    // template 选项定义了组件的 HTML 结构
    // Vue 会将这个模板渲染到挂载点
    template: `
        <div id="app-content">
            <h1>{{ message }}</h1>
            <p>{{ greeting }}</p>
            <p>这个内容是由 Vue 实例渲染的。</p>
        </div>
    `
};

// 2. 创建 Vue 应用实例
// Vue.createApp() 方法用于创建一个新的应用实例
// 它接收一个根组件作为参数
const app = Vue.createApp(AppRootComponent);

// 3. 挂载应用到 DOM 元素
// app.mount() 方法将应用实例挂载到指定的 DOM 元素上
// 参数可以是 CSS 选择器字符串或实际的 DOM 元素
// 一旦挂载，Vue 就会控制该 DOM 元素及其内部的所有内容
app.mount('#app');

console.log("Vue 应用已成功挂载到 #app 元素。");
```

-   **关键点**:
    -   `const AppRootComponent = { ... }`: 定义了 Vue 应用的根组件。`data()` 方法返回响应式数据，`template` 字符串定义了组件的 HTML 结构。
    -   `const app = Vue.createApp(AppRootComponent);`: 创建 Vue 应用实例，将 `AppRootComponent` 作为根组件。
    -   `app.mount('#app');`: 将 Vue 应用实例挂载到 `index.html` 中 `id` 为 `app` 的 `div` 元素上。

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  您将看到由 Vue 渲染的 "Hello Vue 3!" 和 "欢迎学习 Vue.js！" 文本。

## 总结

通过本模块的学习，您应该理解了 Vue 应用是如何启动的：首先通过 `Vue.createApp()` 创建一个应用实例，然后通过 `.mount()` 方法将其连接到页面上的一个 DOM 元素。这标志着 Vue 接管了该 DOM 区域的控制权，并开始根据组件的模板和数据进行渲染。
