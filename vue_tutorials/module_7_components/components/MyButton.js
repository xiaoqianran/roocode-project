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