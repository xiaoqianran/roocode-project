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
                - \`v-bind\` 用于将数据从组件绑定到 DOM 属性（单向绑定）。
                - \`v-model\` 用于在表单输入元素上创建双向绑定，它是 \`v-bind:value\` 和 \`v-on:input\` 的语法糖。
            </p>
        </div>
    `
};

const app = Vue.createApp(AppRootComponent);
app.mount('#app');

console.log("模块 3: 数据绑定示例已加载。");