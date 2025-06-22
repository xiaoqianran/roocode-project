# 模块 3: 数据绑定

## 概念解析

数据绑定是 Vue.js 最核心的特性之一，它使得数据和 DOM 之间能够保持同步。当数据发生变化时，DOM 会自动更新；当用户在表单中输入时，数据也会自动更新。Vue 提供了两种主要的数据绑定方式：**单向数据绑定**和**双向数据绑定**。

### 1. 单向数据绑定 (`v-bind` 或 `:`)

-   **作用**: 将组件实例中的数据绑定到 HTML 元素的属性上。数据流是单向的，即从数据流向 DOM。当数据变化时，DOM 会更新，但反之则不会。
-   **语法**: `v-bind:attribute="dataProperty"` 或简写为 `:attribute="dataProperty"`。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `element.setAttribute('attribute', value)` 或直接设置 `element.property = value`。Vue 使得这个过程声明式且响应式。
-   **常见用途**: 绑定 `src` (图片路径), `href` (链接), `class` (CSS 类), `style` (内联样式), `disabled` (按钮禁用状态) 等。

### 2. 双向数据绑定 (`v-model`)

-   **作用**: 主要用于表单输入元素（`<input>`, `<textarea>`, `<select>`），它实现了数据和 DOM 之间的双向同步。当数据变化时，表单元素的值会更新；当用户在表单元素中输入时，组件的数据也会自动更新。
-   **语法**: `v-model="dataProperty"`。
-   **原理**: `v-model` 实际上是 `v-bind:value` 和 `v-on:input` 的语法糖。它监听表单元素的 `input` 事件，并根据输入值更新绑定的数据。
-   **与传统 JS 对应**: 传统 JavaScript 中，我们需要手动监听 `input` 或 `change` 事件，然后通过 `event.target.value` 获取值并更新 JavaScript 变量。`v-model` 极大地简化了这一过程。
-   **修饰符**: `v-model` 提供了几个修饰符来处理常见的表单输入场景：
    -   `.lazy`: 默认情况下，`v-model` 在 `input` 事件后同步输入框的值。`.lazy` 会在 `change` 事件后同步。
    -   `.number`: 自动将用户输入的值转换为数字类型。
    -   `.trim`: 自动去除用户输入的首尾空格。

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 3: 数据绑定</title>
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
        input[type="text"], textarea {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        .output {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
            word-wrap: break-word;
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

// 模块 3: 数据绑定

const AppRootComponent = {
    data() {
        return {
            // 单向数据绑定示例
            productName: "Vue.js 响应式数据",
            itemCount: 10,
            isActive: true,

            // 双向数据绑定示例 (v-model)
            message: "Hello Vue!",
            userName: "访客",
            description: "这是一个多行文本输入框。",
            selectedOption: "optionA",
            checkedItems: ["item1"],
            isAgreed: false
        };
    },
    template: `
        <div id="app-content">
            <h1>Vue 数据绑定示例</h1>

            <h2>1. 单向数据绑定 (v-bind 或 :)</h2>
            <p>产品名称: <strong>{{ productName }}</strong></p>
            <p>库存数量: <span :class="{ 'text-danger': itemCount < 5 }">{{ itemCount }}</span></p>
            <p :style="{ color: isActive ? 'green' : 'gray', fontSize: '20px' }">
                状态: {{ isActive ? '活跃' : '非活跃' }}
            </p>
            <hr>

            <h2>2. 双向数据绑定 (v-model)</h2>

            <h3>文本输入框</h3>
            <label for="messageInput">输入消息:</label>
            <input type="text" id="messageInput" v-model="message" placeholder="请输入...">
            <p class="output">您输入的消息是: <strong>{{ message }}</strong></p>
            <hr>

            <h3>用户名输入框 (带修饰符)</h3>
            <label for="userNameInput">输入用户名 (.trim 修饰符):</label>
            <input type="text" id="userNameInput" v-model.trim="userName" placeholder="请输入用户名...">
            <p class="output">您的用户名是: <strong>"{{ userName }}"</strong> (已去除首尾空格)</p>
            <hr>

            <h3>多行文本框</h3>
            <label for="descriptionTextarea">描述:</label>
            <textarea id="descriptionTextarea" v-model="description" rows="4" placeholder="请输入描述..."></textarea>
            <p class="output">您的描述是: <strong>{{ description }}</strong></p>
            <hr>

            <h3>单选框 (Radio Buttons)</h3>
            <label>选择一个选项:</label><br>
            <input type="radio" id="optionA" value="optionA" v-model="selectedOption">
            <label for="optionA">选项 A</label><br>
            <input type="radio" id="optionB" value="optionB" v-model="selectedOption">
            <label for="optionB">选项 B</label><br>
            <p class="output">您选择的是: <strong>{{ selectedOption }}</strong></p>
            <hr>

            <h3>复选框 (Checkboxes)</h3>
            <label>选择您喜欢的:</label><br>
            <input type="checkbox" id="item1" value="item1" v-model="checkedItems">
            <label for="item1">项目 1</label><br>
            <input type="checkbox" id="item2" value="item2" v-model="checkedItems">
            <label for="item2">项目 2</label><br>
            <input type="checkbox" id="item3" value="item3" v-model="checkedItems">
            <label for="item3">项目 3</label><br>
            <p class="output">您选择的项目是: <strong>{{ checkedItems }}</strong></p>
            <hr>

            <h3>单个复选框 (Boolean)</h3>
            <input type="checkbox" id="agree" v-model="isAgreed">
            <label for="agree">我同意条款和条件</label><br>
            <p class="output">是否同意: <strong>{{ isAgreed ? '是' : '否' }}</strong></p>
            <hr>

            <p>
                **总结**:
                - `v-bind` 用于将数据从组件绑定到 DOM 属性（单向绑定）。
                - `v-model` 用于在表单输入元素上创建双向绑定，它是 `v-bind:value` 和 `v-on:input` 的语法糖。
            </p>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 3: 数据绑定示例已加载。");
```

-   **Linter 警告说明**: 在 `app.js` 中，您可能会看到关于模板字符串内部的 TypeScript linter 警告（例如 `',' expected.` 或 `':' expected.`）。这是因为 linter 尝试将 Vue 模板语法解析为 TypeScript/JSX，而它不理解 Vue 的特定语法。**请放心，这并不会影响代码在浏览器中的实际运行，因为 Vue CDN 会正确解析这些模板。**

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  尝试在输入框中输入内容，选择单选框和复选框，观察数据和 DOM 的同步变化。

## 总结

数据绑定是 Vue 响应式系统的核心。通过 `v-bind`，我们可以轻松地将数据渲染到 HTML 属性中；通过 `v-model`，我们可以实现表单输入和数据之间的双向同步，极大地简化了表单处理的复杂性。理解并熟练运用数据绑定是构建交互式 Vue 应用的关键。