# 模块 7: 组件化

## 概念解析

组件是 Vue.js 最强大和核心的特性之一。它允许我们将用户界面拆分为独立、可复用的小块，每个小块都有自己的逻辑、模板和样式。组件化是构建大型、复杂应用的关键。

### 1. 组件的定义与注册

-   **定义**: 在 Vue 中，一个组件本质上是一个包含 Vue 选项（如 `data`, `methods`, `template`, `props` 等）的普通 JavaScript 对象。
-   **注册**:
    -   **全局注册**: 通过 `app.component('component-name', ComponentOptions)` 在整个应用中注册组件，使其在任何地方都可用。
    -   **局部注册**: 在父组件的 `components` 选项中注册子组件。局部注册的组件只在该父组件及其子组件中可用。
-   **与传统 JS 对应**: 传统 JavaScript 中没有内置的组件概念。我们通常会编写函数或类来封装 UI 逻辑，但缺乏统一的生命周期、通信机制和模板系统。Vue 组件提供了一个结构化的方式来封装和管理 UI 单元。

### 2. 父子组件通信

组件之间需要相互通信才能协同工作。Vue 提供了几种通信方式，其中最常见的是 **Props** 和 **Emits**。

-   **Props (父传子)**:
    -   **作用**: 父组件通过 `props` 向子组件传递数据。`props` 是子组件接收的自定义属性。
    -   **单向数据流**: `props` 是单向的，即数据从父组件流向子组件。子组件不应该直接修改 `props`，如果需要修改，应该通过 `emit` 事件通知父组件。
    -   **语法**: 在子组件中通过 `props` 选项声明接收的属性。在父组件模板中，通过 `v-bind:` 或 `:` 绑定数据到子组件的 `props`。
    -   **与传统 JS 对应**: 类似于在调用函数时传递参数，或者在创建 DOM 元素时设置其属性。

-   **Emits (子传父)**:
    -   **作用**: 子组件通过触发自定义事件来向父组件发送消息。
    -   **语法**: 在子组件中，使用 `this.$emit('eventName', payload)` 来触发事件。在父组件模板中，通过 `v-on:` 或 `@` 监听子组件触发的自定义事件。
    -   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `element.dispatchEvent(new CustomEvent('eventName'))` 来触发自定义事件，然后父元素通过 `addEventListener` 监听。

### 3. 内容分发 - 插槽 (Slots)

-   **作用**: 插槽允许父组件向子组件的指定位置插入任意内容（HTML、其他组件等）。这使得组件更加灵活和可复用。
-   **默认插槽 (Default Slot)**:
    -   **语法**: 在子组件模板中使用 `<slot></slot>`。父组件在子组件标签内部放置的内容将渲染到这个插槽位置。
-   **具名插槽 (Named Slots)**:
    -   **语法**: 在子组件模板中使用 `<slot name="slotName"></slot>`。父组件通过 `v-slot:slotName` 或 `#slotName` 来指定内容要插入到哪个具名插槽。
-   **与传统 JS 对应**: 传统上，我们可能需要手动将子 DOM 元素插入到父 DOM 元素的特定位置。插槽提供了一种声明式且更强大的内容分发机制。

## 代码示例 (`index.html`, `components/MyButton.js`, `components/MyCard.js`, `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 7: 组件化</title>
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
            max-width: 700px;
            width: 90%;
        }
        h1, h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }
        .component-section {
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            background-color: #fdfdfd;
        }
        .component-section h3 {
            color: #007bff;
            margin-top: 0;
        }
        .my-button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: white;
            margin: 5px;
            transition: background-color 0.3s ease;
        }
        .my-button.primary { background-color: #007bff; }
        .my-button.primary:hover { background-color: #0056b3; }
        .my-button.success { background-color: #28a745; }
        .my-button.success:hover { background-color: #218838; }
        .my-button.danger { background-color: #dc3545; }
        .my-button.danger:hover { background-color: #c82333; }

        .my-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            text-align: left;
        }
        .my-card h4 {
            margin-top: 0;
            color: #666;
        }
        .my-card p {
            color: #444;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- Vue 将在这里渲染内容 -->
    </div>

    <!-- 引入 Vue 应用的 JavaScript 文件 -->
    <script src="components/MyButton.js"></script>
    <script src="components/MyCard.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### `components/MyButton.js`

```javascript
// components/MyButton.js

// 定义一个可复用的按钮组件
const MyButton = {
    // props 选项用于接收父组件传递的数据
    // 定义 props 时，可以指定类型、默认值、是否必需等
    props: {
        text: {
            type: String,
            required: true // text 属性是必需的
        },
        variant: {
            type: String,
            default: "primary", // 默认样式为 primary
            validator: function (value) {
                // variant 必须是这些字符串中的一个
                return ['primary', 'success', 'danger'].indexOf(value) !== -1
            }
        }
    },
    // emits 选项用于声明组件可以触发的自定义事件
    // 这样可以提高代码的可读性和可维护性
    emits: ['button-click'], // 声明一个名为 'button-click' 的事件

    // methods 选项用于定义组件的方法
    methods: {
        handleClick() {
            // 当按钮被点击时，触发一个自定义事件 'button-click'
            // 可以选择性地传递数据给父组件
            this.$emit('button-click', this.text);
        }
    },
    // template 选项定义了组件的 HTML 结构
    template: `
        <button :class="['my-button', variant]" @click="handleClick">
            {{ text }}
        </button>
    `
};
```

### `components/MyCard.js`

```javascript
// components/MyCard.js

// 定义一个带插槽的卡片组件
const MyCard = {
    // props 选项用于接收父组件传递的数据
    props: {
        title: {
            type: String,
            default: "默认卡片标题"
        }
    },
    // slots (插槽) 允许父组件向子组件的指定位置插入内容
    // 默认插槽 (匿名插槽)
    template: `
        <div class="my-card">
            <h4>{{ title }}</h4>
            <slot></slot> <!-- 默认插槽，用于接收父组件传递的任何内容 -->
            <p style="font-size: 0.9em; color: #888; margin-top: 15px;">
                (这是卡片组件内部的固定内容)
            </p>
        </div>
    `
};
```

### `app.js`

```javascript
// app.js

// 模块 7: 组件化

const AppRootComponent = {
    data() {
        return {
            buttonClickMessage: "等待按钮点击...",
            cardTitle: "我的自定义卡片"
        };
    },
    // components 选项用于注册当前组件可用的子组件
    // 注册后，可以在模板中像普通 HTML 标签一样使用它们
    components: {
        // 局部注册组件
        // 'my-button': MyButton, // 也可以使用 kebab-case
        MyButton, // 如果组件名是 PascalCase，可以直接使用
        MyCard
    },
    methods: {
        // 处理 MyButton 组件触发的自定义事件
        handleButtonClick(buttonText) {
            this.buttonClickMessage = `您点击了 "${buttonText}" 按钮！`;
            console.log(`父组件接收到事件: ${buttonText} 按钮被点击`);
        }
    },
    template: `
        <div id="app-content">
            <h1>Vue 组件化示例</h1>

            <div class="component-section">
                <h2>1. 父子组件通信 - Props (父传子) & Emits (子传父)</h2>
                <h3>使用 MyButton 组件:</h3>
                <p>{{ buttonClickMessage }}</p>
                
                <!-- 使用 MyButton 组件 -->
                <!-- 通过 v-bind 或 : 传递 props -->
                <!-- 通过 v-on 或 @ 监听子组件触发的自定义事件 -->
                <MyButton text="主要按钮" variant="primary" @button-click="handleButtonClick" />
                <MyButton text="成功按钮" variant="success" @button-click="handleButtonClick" />
                <MyButton text="危险按钮" variant="danger" @button-click="handleButtonClick" />
                <MyButton text="默认按钮" @button-click="handleButtonClick" />
                <p style="font-size: 0.9em; color: #888;">
                    (点击按钮，观察上方消息变化和控制台输出)
                </p>
            </div>

            <div class="component-section">
                <h2>2. 内容分发 - 插槽 (Slots)</h2>
                <h3>使用 MyCard 组件:</h3>
                
                <!-- 使用 MyCard 组件，并通过插槽分发内容 -->
                <MyCard :title="cardTitle">
                    <p>这是通过**默认插槽**插入到卡片组件内部的**段落内容**。</p>
                    <ul>
                        <li>列表项 1</li>
                        <li>列表项 2</li>
                    </ul>
                    <p>您可以在这里放置任何 HTML 结构。</p>
                </MyCard>

                <MyCard title="另一个卡片">
                    <p>这个卡片有不同的内容。</p>
                    <strong>加粗文本</strong>
                </MyCard>
                <p style="font-size: 0.9em; color: #888;">
                    (观察卡片内部的内容是如何由父组件提供的)
                </p>
            </div>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 7: 组件化示例已加载。");
```

-   **Linter 警告说明**: 在 `app.js`、`MyButton.js` 和 `MyCard.js` 中，您可能会看到关于模板字符串内部的 TypeScript linter 警告。这是因为 linter 尝试将 Vue 模板语法解析为 TypeScript/JSX，而它不理解 Vue 的特定语法。**请放心，这并不会影响代码在浏览器中的实际运行，因为 Vue CDN 会正确解析这些模板。**

## 如何运行

1.  确保 `index.html`、`app.js` 以及 `components` 文件夹（包含 `MyButton.js` 和 `MyCard.js`）都在同一个 `vue_tutorials/module_7_components` 目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  尝试点击不同颜色的按钮，观察父组件中消息的变化和控制台输出。
4.  观察两个卡片组件，它们如何通过 `props` 接收标题，并通过插槽接收不同的内容。

## 总结

组件化是 Vue.js 应用程序架构的基石。通过将 UI 拆分为独立、可复用的组件，我们可以提高代码的可维护性、可读性和开发效率。Props、Emits 和 Slots 是组件之间进行通信和内容分发的核心机制，理解并熟练运用它们是构建复杂 Vue 应用的关键。