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