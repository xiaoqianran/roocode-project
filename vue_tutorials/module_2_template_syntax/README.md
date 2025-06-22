# 模块 2: 模板语法

## 概念解析

Vue.js 使用一种基于 HTML 的模板语法，允许我们声明式地将组件实例的数据渲染到 DOM 中。这意味着我们只需要描述 UI 应该是什么样子，而不需要手动操作 DOM。

### 1. 文本插值 (Text Interpolation) - `{{ ... }}`

-   **作用**: 最基本的数据绑定形式，用于显示组件实例中的数据。双大括号 `{{ }}` 内可以是任何有效的 JavaScript 表达式。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `element.textContent = variable` 来动态更新文本内容。Vue 自动化了这一过程，当 `data` 中的数据变化时，DOM 会自动更新。

### 2. HTML 插值 (Raw HTML) - `v-html`

-   **作用**: 用于渲染原始 HTML 内容。Vue 默认会转义 HTML 内容以防止 XSS 攻击，但 `v-html` 指令允许我们显式地渲染未转义的 HTML。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `element.innerHTML = htmlString`。使用时需谨慎，确保内容来源可靠。

### 3. 属性绑定 (Attribute Bindings) - `v-bind:` 或 `:`

-   **作用**: 用于动态绑定 HTML 元素的属性。例如，`src`、`href`、`class`、`style` 等。`v-bind:` 可以简写为 `:`。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `element.setAttribute('attribute', value)` 或直接设置 `element.property = value`。

### 4. JavaScript 表达式

-   **作用**: 在 `{{ }}` 或 `v-bind` 内部，可以使用简单的 JavaScript 表达式。这些表达式会在数据变化时被重新计算。
-   **限制**: 模板内的表达式只能包含**单个表达式**。不能使用 `if` 语句、`for` 循环、变量声明等复杂的语句。对于更复杂的逻辑，应使用**计算属性 (Computed Properties)** 或 **方法 (Methods)**。

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 2: 模板语法</title>
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
        }
        p {
            margin-bottom: 10px;
        }
        .highlight {
            color: #007bff;
            font-weight: bold;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 15px auto;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
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

// 模块 2: 模板语法

const AppRootComponent = {
    data() {
        return {
            // 文本插值
            productName: "Vue.js 学习指南",
            price: 99.99,
            isAvailable: true,

            // HTML 插值
            rawHtmlContent: '<span style="color: red; font-weight: bold;">这是由 v-html 渲染的红色粗体文本。</span>',

            // 属性绑定
            imageUrl: 'https://vuejs.org/images/logo.png', // 假设这是一个有效的图片 URL
            imageAlt: 'Vue.js Logo',
            linkUrl: 'https://cn.vuejs.org/',
            isDisabled: false,

            // JavaScript 表达式
            message: "Hello Vue Template Syntax",
            items: ["Apple", "Banana", "Cherry"]
        };
    },
    template: `
        <div id="app-content">
            <h1>Vue 模板语法示例</h1>

            <h2>1. 文本插值 (Text Interpolation) - {{ ... }}</h2>
            <p>产品名称: <span class="highlight">{{ productName }}</span></p>
            <p>价格: ￥{{ price.toFixed(2) }}</p>
            <p>库存状态: {{ isAvailable ? '有货' : '缺货' }}</p>
            <p>当前年份: {{ new Date().getFullYear() }}</p>
            <hr>

            <h2>2. HTML 插值 (Raw HTML) - v-html</h2>
            <p>使用 v-html 渲染原始 HTML:</p>
            <div v-html="rawHtmlContent"></div>
            <hr>

            <h2>3. 属性绑定 (Attribute Bindings) - v-bind: 或 :</h2>
            <p>使用 v-bind 绑定 HTML 属性:</p>
            <img v-bind:src="imageUrl" :alt="imageAlt" width="100">
            <p>
                访问 Vue 官方文档:
                <a :href="linkUrl" target="_blank">
                    {{ linkUrl }}
                </a>
            </p>
            <button :disabled="isDisabled">这是一个按钮</button>
            <hr>

            <h2>4. JavaScript 表达式</h2>
            <p>反转消息: {{ message.split('').reverse().join('') }}</p>
            <p>数组的第一个元素: {{ items[0] }}</p>
            <p>计算结果: {{ price * 2 }}</p>
            <hr>

            <p>
                **注意**: 模板内的表达式是 JavaScript 表达式，但它们只能包含**单个表达式**。
                例如，不能在插值表达式中直接使用 `if` 语句或循环。
            </p>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 2: 模板语法示例已加载。");
```

-   **Linter 警告说明**: 在 `app.js` 中，您可能会看到关于模板字符串内部的 TypeScript linter 警告（例如 `',' expected.` 或 `':' expected.`）。这是因为 linter 尝试将 Vue 模板语法解析为 TypeScript/JSX，而它不理解 Vue 的特定语法。**请放心，这并不会影响代码在浏览器中的实际运行，因为 Vue CDN 会正确解析这些模板。**

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  您将看到各种模板语法示例的渲染效果。

## 总结

模板语法是 Vue 的核心之一，它使得数据和 DOM 之间的同步变得声明式且高效。通过 `{{ }}` 进行文本插值，`v-html` 渲染原始 HTML，以及 `v-bind` 动态绑定属性，Vue 极大地简化了传统 JavaScript 中繁琐的 DOM 操作。理解这些基本概念是掌握 Vue 的关键。