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
                例如，不能在插值表达式中直接使用 if 语句或循环。
            </p>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 2: 模板语法示例已加载。");