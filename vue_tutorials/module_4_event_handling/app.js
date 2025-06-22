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