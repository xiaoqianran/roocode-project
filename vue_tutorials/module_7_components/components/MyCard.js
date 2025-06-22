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