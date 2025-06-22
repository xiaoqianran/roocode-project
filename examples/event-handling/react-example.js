// react-example.js
// React 事件处理示例

import { useState } from 'react';

// 1. 基本点击事件 (函数组件)
function ClickCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        console.log('Button clicked! Count:', count + 1);
    };

    return (
        <div className="event-card">
            <h3>React 点击事件</h3>
            <p>You clicked {count} times.</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

// 2. 输入框 Change 事件 (函数组件)
function InputLogger() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
        console.log('Input value:', event.target.value);
    };

    return (
        <div className="event-card">
            <h3>React 输入事件</h3>
            <input type="text" value={inputValue} onChange={handleChange} placeholder="Type something..." />
            <p>Current input: {inputValue}</p>
        </div>
    );
}

// 3. 阻止默认行为 (表单提交)
function SubmitForm() {
    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单默认提交行为
        alert('Form submitted! (Default behavior prevented)');
        console.log('Form submitted!');
    };

    return (
        <div className="event-card">
            <h3>React 表单提交事件</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter something" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

// 4. 事件参数传递 (箭头函数)
function ParameterButton() {
    const showMessage = (message) => {
        alert(message);
        console.log(message);
    };

    return (
        <div className="event-card">
            <h3>React 事件参数</h3>
            <button onClick={() => showMessage('Hello from React!')}>Show Message</button>
        </div>
    );
}


// 组合组件
function App() {
    return (
        <div>
            <h2>React 事件处理示例</h2>
            <ClickCounter />
            <InputLogger />
            <SubmitForm />
            <ParameterButton />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);