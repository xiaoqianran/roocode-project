export default {
    data() {
        return {
            count: 0
        };
    },
    methods: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    },
    template: `
        <div>
            <h1>计数器</h1>
            <p>当前计数: {{ count }}</p>
            <button @click="increment">增加</button>
            <button @click="decrement">减少</button>
        </div>
    `
};