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