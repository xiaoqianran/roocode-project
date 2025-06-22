// react-example.js
// React 状态示例

import { useState } from 'react';

// 1. 函数组件中的状态 (useState)
function Counter() {
    const [count, setCount] = useState(0); // 初始化状态

    const increment = () => {
        setCount(count + 1); // 更新状态
    };

    const decrement = () => {
        setCount(count - 1); // 更新状态
    };

    return (
        <div className="state-card">
            <h3>React 函数组件状态</h3>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

// 2. 类组件中的状态 (this.state, this.setState)
class ToggleMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }));
    }

    render() {
        return (
            <div className="state-card">
                <h3>React 类组件状态</h3>
                {this.state.isVisible ? <p>This message is visible!</p> : <p>Message is hidden.</p>}
                <button onClick={this.toggleVisibility}>
                    {this.state.isVisible ? 'Hide Message' : 'Show Message'}
                </button>
            </div>
        );
    }
}

// 组合组件
function App() {
    return (
        <div>
            <h2>React 状态示例</h2>
            <Counter />
            <ToggleMessage />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);