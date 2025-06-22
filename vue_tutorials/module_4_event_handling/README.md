# 模块 4: 事件处理

## 概念解析

在 Vue.js 中，我们可以使用 `v-on` 指令（简写为 `@`）来监听 DOM 事件，并在事件触发时执行 JavaScript 代码。这使得处理用户交互变得非常直观和声明式。

### 1. 方法事件处理器

-   **作用**: 当事件触发时，调用组件 `methods` 中定义的一个方法。这是最常见的事件处理方式。
-   **语法**: `v-on:event="methodName"` 或 `@event="methodName"`。
-   **事件对象**: Vue 会自动将原生 DOM 事件对象作为第一个参数传递给方法。
-   **与传统 JS 对应**: 类似于传统 JavaScript 中使用 `element.addEventListener('event', handlerFunction)`。Vue 简化了事件监听和 `this` 上下文的管理。

### 2. 内联事件处理器

-   **作用**: 在模板中直接编写 JavaScript 语句来处理事件。适用于简单的逻辑。
-   **语法**: `v-on:event="statement"` 或 `@event="statement"`。
-   **参数传递**: 可以直接在内联语句中传递参数。如果需要访问原生事件对象，可以使用特殊变量 `$event`。
-   **与传统 JS 对应**: 类似于传统 HTML 中使用 `onclick="someFunction()"`。

### 3. 事件修饰符

Vue 提供了事件修饰符来处理常见的事件行为，而无需在方法中手动调用 `event.preventDefault()` 或 `event.stopPropagation()`。

-   `.stop`: 阻止事件冒泡。对应 `event.stopPropagation()`。
    -   **示例**: `@click.stop="doSomething"`
-   `.prevent`: 阻止事件的默认行为。对应 `event.preventDefault()`。
    -   **示例**: `@submit.prevent="submitForm"` (阻止表单提交刷新页面)
-   `.capture`: 添加事件监听器时使用捕获模式。
    -   **示例**: `@click.capture="doSomething"`
-   `.self`: 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    -   **示例**: `@click.self="doSomething"`
-   `.once`: 事件只触发一次。
    -   **示例**: `@click.once="doSomething"`
-   `.passive`: 提高移动端滚动性能。
    -   **示例**: `@scroll.passive="onScroll"`

### 4. 键盘事件修饰符

Vue 也提供了键盘事件修饰符，用于监听特定的按键。

-   `.enter`: 监听 Enter 键。
-   `.tab`: 监听 Tab 键。
-   `.delete` (捕获 Delete 和 Backspace 键)。
-   `.esc`: 监听 Esc 键。
-   `.space`: 监听 Space 键。
-   `.up`, `.down`, `.left`, `.right`: 监听方向键。
-   `.ctrl`, `.alt`, `.shift`, `.meta`: 监听系统修饰键。

## 代码示例 (`index.html` 和 `app.js`)

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 模块 4: 事件处理</title>
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
            margin: 5px;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056b3;
        }
        .output {
            margin-top: 20px;
            padding: 15px;
            background-color: #e9ecef;
            border-radius: 5px;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #333;
        }
        form {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f8f9fa;
        }
        input[type="text"] {
            padding: 8px;
            width: calc(100% - 16px);
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
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

// 模块 4: 事件处理

const AppRootComponent = {
    data() {
        return {
            clickCount: 0,
            message: "点击按钮或提交表单来查看效果。",
            inputValue: ""
        };
    },
    methods: {
        // 1. 方法事件处理器
        // 当事件触发时，Vue 会自动将原生 DOM 事件对象作为第一个参数传递给方法
        handleClick(event) {
            this.clickCount++;
            this.message = `按钮被点击了 ${this.clickCount} 次！`;
            console.log("原生事件对象:", event);
        },

        // 2. 内联事件处理器
        // 可以在模板中直接编写 JavaScript 语句
        handleInlineClick(value) {
            this.message = `内联点击处理器被触发，传递的值是: ${value}`;
        },

        // 3. 事件修饰符 - .stop
        // 阻止事件冒泡，对应 event.stopPropagation()
        handleParentClick() {
            this.message = "父级 div 被点击了 (事件冒泡)";
        },
        handleChildClick() {
            this.message = "子级按钮被点击了 (事件冒泡被阻止)";
        },

        // 4. 事件修饰符 - .prevent
        // 阻止默认行为，对应 event.preventDefault()
        handleSubmit(event) {
            // event.preventDefault(); // 使用 .prevent 修饰符后，无需手动调用
            this.message = `表单已提交，输入值为: "${this.inputValue}"。默认行为（页面刷新）已被阻止。`;
            console.log("表单提交事件:", event);
        },

        // 5. 事件修饰符 - .once
        // 事件只触发一次
        handleOnceClick() {
            this.message = "这个按钮只能点击一次！";
            console.log("一次性点击事件触发。");
        },

        // 6. 键盘事件修饰符 - .enter
        // 监听特定按键
        handleEnterKey() {
            this.message = `您按下了 Enter 键，输入值为: "${this.inputValue}"`;
            console.log("Enter 键被按下。");
        }
    },
    template: `
        <div id="app-content">
            <h1>Vue 事件处理示例</h1>

            <h2>1. 方法事件处理器 (v-on:click="methodName")</h2>
            <button v-on:click="handleClick">点击我 (方法处理器)</button>
            <p class="output">{{ message }}</p>
            <hr>

            <h2>2. 内联事件处理器 (v-on:click="statement")</h2>
            <button @click="handleInlineClick('Hello from inline!')">点击我 (内联处理器)</button>
            <p class="output">{{ message }}</p>
            <hr>

            <h2>3. 事件修饰符 - .stop (阻止冒泡)</h2>
            <div @click="handleParentClick" style="padding: 20px; background-color: #e0e0e0; cursor: pointer;">
                父级 Div (点击我)
                <button @click.stop="handleChildClick">子级按钮 (阻止冒泡)</button>
            </div>
            <p class="output">{{ message }}</p>
            <hr>

            <h2>4. 事件修饰符 - .prevent (阻止默认行为)</h2>
            <form @submit.prevent="handleSubmit">
                <label for="formInput">输入内容:</label>
                <input type="text" id="formInput" v-model="inputValue" placeholder="输入并按回车或点击提交">
                <button type="submit">提交表单</button>
            </form>
            <p class="output">{{ message }}</p>
            <hr>

            <h2>5. 事件修饰符 - .once (只触发一次)</h2>
            <button @click.once="handleOnceClick">点击我 (只触发一次)</button>
            <p class="output">{{ message }}</p>
            <hr>

            <h2>6. 键盘事件修饰符 - .enter</h2>
            <label for="keyInput">在输入框中按下 Enter 键:</label>
            <input type="text" id="keyInput" v-model="inputValue" @keyup.enter="handleEnterKey" placeholder="输入并按 Enter">
            <p class="output">{{ message }}</p>
            <hr>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 4: 事件处理示例已加载。");
```

## 如何运行

1.  将 `index.html` 和 `app.js` 文件放在同一个目录下。
2.  在浏览器中打开 `index.html` 文件。
3.  尝试点击按钮、在输入框中输入并按回车、点击父级和子级元素，观察事件处理和修饰符的效果。

## 总结

Vue 的事件处理机制通过 `v-on` 指令极大地简化了 DOM 事件的监听和处理。无论是调用方法、执行内联语句，还是利用丰富的事件修饰符来控制事件行为，Vue 都提供了一种声明式且高效的方式来响应用户交互，使得前端开发更加直观和易于维护。