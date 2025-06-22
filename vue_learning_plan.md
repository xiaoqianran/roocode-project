# Vue.js 学习计划：HTML/CSS/JS 功能对应

## 目标
- 掌握 Vue.js 的核心概念和功能。
- 理解 Vue.js 如何抽象和简化传统 HTML、CSS 和 JavaScript 的开发模式。
- 能够将现有前端知识映射到 Vue.js 的对应功能。

## 学习模块与伪代码结构

### 模块 1: Vue 实例与应用挂载 (对应 HTML 结构与 JS 入口)

#### 概念
- Vue 应用的起点，通过 `new Vue()` 或 `createApp()` 创建。
- 将 Vue 应用挂载到 DOM 元素上。

#### HTML/JS 对应
- **HTML**: `<div id="app"></div>` - 定义应用挂载点。
- **JavaScript**: `document.getElementById('app')` - 获取 DOM 元素。
- **JavaScript**: 传统上直接操作 DOM 元素来初始化应用。

#### Vue 伪代码
```pseudocode
// main.js 或 app.js
FUNCTION createVueApp()
    // 定义 Vue 应用的根组件
    CONST AppRootComponent = {
        DATA: {
            message: "Hello Vue!"
        },
        TEMPLATE: `
            <div id="app">
                {{ message }}
            </div>
        `
    }

    // 创建 Vue 应用实例
    CONST app = Vue.createApp(AppRootComponent)

    // 挂载应用到 DOM 元素
    app.mount('#app')
END FUNCTION

// 调用函数启动应用
CALL createVueApp()
```

### 模块 2: 模板语法 (对应 HTML 内容与 JS 表达式)

#### 概念
- Vue 使用基于 HTML 的模板语法，允许声明式地将数据渲染到 DOM。
- 插值、指令、表达式。

#### HTML/JS 对应
- **HTML**: `<p>Hello World</p>` - 静态文本。
- **JavaScript**: `document.getElementById('id').textContent = variable` - 动态更新文本。
- **JavaScript**: 字符串拼接或模板字面量 (`${variable}`)。

#### Vue 伪代码
```pseudocode
// Vue 组件模板
TEMPLATE `
    <!-- 文本插值 (对应 JS 变量输出到 HTML) -->
    <p>{{ dataProperty }}</p>

    <!-- HTML 插值 (对应 JS innerHTML) -->
    <div v-html="rawHtml"></div>

    <!-- 属性绑定 (对应 JS element.setAttribute) -->
    <img v-bind:src="imageUrl" alt="Image">
    <a :href="linkUrl">Link</a>

    <!-- JavaScript 表达式 -->
    <p>{{ number + 1 }}</p>
    <p>{{ message.split('').reverse().join('') }}</p>
`
```

### 模块 3: 数据绑定 (对应 JS 变量与 DOM 操作)

#### 概念
- Vue 的核心特性，将数据与 DOM 保持同步。
- 单向数据流 (`v-bind`) 和双向数据绑定 (`v-model`)。

#### HTML/JS 对应
- **JavaScript**: 直接修改 DOM 元素的 `textContent` 或 `value`。
- **JavaScript**: 监听 `input` 事件手动更新数据。

#### Vue 伪代码
```pseudocode
// Vue 组件数据
DATA: {
    message: "Hello",
    inputValue: "初始值"
}

// Vue 组件模板
TEMPLATE `
    <!-- 单向数据绑定 (从数据到 DOM) -->
    <p>{{ message }}</p>
    <input :value="message" readonly>

    <!-- 双向数据绑定 (表单输入，数据和 DOM 互相更新) -->
    <input v-model="inputValue">
    <p>您输入的是: {{ inputValue }}</p>
`
```

### 模块 4: 事件处理 (对应 JS 事件监听)

#### 概念
- 使用 `v-on` 指令监听 DOM 事件并执行方法。
- 事件修饰符。

#### HTML/JS 对应
- **HTML**: `<button onclick="myFunction()">Click</button>`
- **JavaScript**: `element.addEventListener('click', myFunction)`

#### Vue 伪代码
```pseudocode
// Vue 组件方法
METHODS: {
    handleClick: FUNCTION()
        LOG "按钮被点击了！"
    END FUNCTION,
    submitForm: FUNCTION()
        // 阻止默认行为，对应 event.preventDefault()
        LOG "表单已提交，但默认行为被阻止。"
    END FUNCTION
}

// Vue 组件模板
TEMPLATE `
    <!-- 监听点击事件 -->
    <button v-on:click="handleClick">点击我</button>
    <button @click="handleClick">点击我 (简写)</button>

    <!-- 事件修饰符 -->
    <form @submit.prevent="submitForm">
        <button type="submit">提交</button>
    </form>
`
```

### 模块 5: 计算属性与侦听器 (对应 JS 逻辑与数据响应)

#### 概念
- **计算属性 (Computed Properties)**: 基于响应式依赖缓存的属性，当依赖改变时才重新计算。用于处理复杂逻辑并缓存结果。
- **侦听器 (Watchers)**: 响应数据变化的通用方法，当特定数据属性变化时执行副作用。

#### HTML/JS 对应
- **JavaScript**: 手动编写函数来计算派生数据。
- **JavaScript**: 使用 `setInterval` 或 `setTimeout` 轮询数据变化，或在数据更新时手动触发其他逻辑。

#### Vue 伪代码
```pseudocode
// Vue 组件数据
DATA: {
    firstName: "John",
    lastName: "Doe",
    question: ""
}

// Vue 组件计算属性
COMPUTED: {
    fullName: FUNCTION()
        RETURN this.firstName + " " + this.lastName
    END FUNCTION
}

// Vue 组件侦听器
WATCH: {
    question: FUNCTION(newQuestion, oldQuestion)
        IF newQuestion.includes('?') THEN
            LOG "问题被问了: " + newQuestion
        END IF
    END FUNCTION
}

// Vue 组件模板
TEMPLATE `
    <p>全名: {{ fullName }}</p>
    <input v-model="firstName">
    <input v-model="lastName">

    <input v-model="question" placeholder="问一个问题...">
`
```

### 模块 6: 条件渲染与列表渲染 (对应 JS 逻辑控制 DOM 结构)

#### 概念
- **条件渲染**: 根据条件决定元素是否渲染到 DOM (`v-if`, `v-else-if`, `v-else`, `v-show`)。
- **列表渲染**: 遍历数组或对象渲染元素列表 (`v-for`)。

#### HTML/JS 对应
- **JavaScript**: `if/else` 语句手动添加/移除 DOM 元素 (`element.remove()`, `appendChild()`)。
- **JavaScript**: `for` 循环或 `forEach` 遍历数组，手动创建 DOM 元素并插入。

#### Vue 伪代码
```pseudocode
// Vue 组件数据
DATA: {
    isLoggedIn: true,
    items: ["Apple", "Banana", "Orange"],
    userType: "admin"
}

// Vue 组件模板
TEMPLATE `
    <!-- 条件渲染 (v-if/v-else-if/v-else) -->
    <div v-if="isLoggedIn">欢迎回来！</div>
    <div v-else-if="userType === 'admin'">管理员面板</div>
    <div v-else>请登录。</div>

    <!-- 条件渲染 (v-show) -->
    <div v-show="isLoggedIn">这个元素总是渲染，但通过 CSS 控制显示/隐藏。</div>

    <!-- 列表渲染 (v-for) -->
    <ul>
        <li v-for="(item, index) in items" :key="index">
            {{ index + 1 }}. {{ item }}
        </li>
    </ul>
`
```

### 模块 7: 组件化 (对应 HTML 模块化与 JS 封装)

#### 概念
- 将 UI 拆分为独立、可复用的组件。
- 组件的 props (父传子数据)、emit (子传父事件)、slots (内容分发)。

#### HTML/JS 对应
- **HTML**: 传统上没有内置的组件概念，通常通过 JS 动态生成 HTML 片段。
- **JavaScript**: 函数或类来封装 UI 逻辑和数据，但没有统一的组件生命周期和通信机制。

#### Vue 伪代码
```pseudocode
// 定义一个子组件 (MyButton.vue)
COMPONENT MyButton
    PROPS: {
        text: String,
        variant: {
            TYPE: String,
            DEFAULT: "primary"
        }
    }
    EMITS: ["click"] // 声明组件可以触发的事件

    TEMPLATE `
        <button :class="variant" @click="handleClick">
            {{ text }}
        </button>
    `
    METHODS: {
        handleClick: FUNCTION()
            EMIT "click" // 触发自定义事件
        END FUNCTION
    }
END COMPONENT

// 在父组件中使用子组件 (App.vue)
COMPONENT App
    DATA: {
        buttonMessage: "按钮被点击了！"
    }
    TEMPLATE `
        <!-- 使用 MyButton 组件，并通过 props 传递数据 -->
        <MyButton text="点击我" variant="success" @click="handleButtonClick" />

        <!-- 使用插槽分发内容 -->
        <MyCard>
            <h3>卡片标题</h3>
            <p>这是卡片内容。</p>
        </MyCard>
    `
    METHODS: {
        handleButtonClick: FUNCTION()
            LOG this.buttonMessage
        END FUNCTION
    }
    COMPONENTS: {
        MyButton,
        MyCard // 假设 MyCard 也是一个已定义的组件
    }
END COMPONENT

// 定义一个带插槽的组件 (MyCard.vue)
COMPONENT MyCard
    TEMPLATE `
        <div class="card">
            <slot><!-- 默认内容 --></slot>
        </div>
    `
END COMPONENT
```

### 模块 8: 生命周期钩子 (对应 JS 在特定时机执行代码)

#### 概念
- Vue 实例或组件在不同阶段（创建、挂载、更新、卸载）会自动调用特定的函数。

#### HTML/JS 对应
- **JavaScript**: `DOMContentLoaded`, `window.onload` 等事件。
- **JavaScript**: 手动在特定时机（如函数调用后、DOM 元素插入后）执行清理或初始化逻辑。

#### Vue 伪代码
```pseudode
// Vue 组件
COMPONENT MyComponent
    DATA: {
        count: 0
    }

    // 组件创建前
    BEFORE_CREATE: FUNCTION()
        LOG "组件实例创建前"
    END FUNCTION

    // 组件实例创建后，数据观测和事件配置完成
    CREATED: FUNCTION()
        LOG "组件实例创建后，数据已响应式化"
        // 可以在这里进行数据初始化、异步请求等
    END FUNCTION

    // 模板编译/挂载前
    BEFORE_MOUNT: FUNCTION()
        LOG "组件挂载到 DOM 前"
    END FUNCTION

    // 模板编译/挂载到 DOM 后
    MOUNTED: FUNCTION()
        LOG "组件已挂载到 DOM"
        // 可以在这里进行 DOM 操作、集成第三方库等
    END FUNCTION

    // 数据更新前
    BEFORE_UPDATE: FUNCTION()
        LOG "组件数据更新前"
    END FUNCTION

    // 数据更新后，DOM 重新渲染完成
    UPDATED: FUNCTION()
        LOG "组件数据更新后，DOM 已更新"
    END FUNCTION

    // 组件卸载前
    BEFORE_UNMOUNT: FUNCTION()
        LOG "组件卸载前"
        // 可以在这里进行清理工作，如清除定时器、取消订阅
    END FUNCTION

    // 组件卸载后
    UNMOUNTED: FUNCTION()
        LOG "组件已从 DOM 卸载"
    END FUNCTION

    TEMPLATE `
        <p>计数: {{ count }}</p>
        <button @click="count++">增加计数</button>
    `
END COMPONENT
```

## 后续步骤
1.  **选择一个模块**：从上述模块中选择一个您想深入学习的模块。
2.  **切换到自动编码器模式**：我们将切换到 `code` 模式，根据伪代码编写实际的 Vue 代码示例。
3.  **编写测试 (可选)**：在 `tdd` 模式下为代码编写测试。
4.  **文档记录**：在 `docs-writer` 模式下记录您的学习过程和代码。

请告诉我您想从哪个模块开始，或者您是否有其他想优先学习的 Vue 功能。