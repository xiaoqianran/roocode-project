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