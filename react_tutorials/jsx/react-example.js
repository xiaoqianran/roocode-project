// react-example.js
// React JSX 示例

// 1. 基本 JSX 元素
const element1 = <h1>Hello, JSX!</h1>;

// 2. JSX 表达式嵌入
const name = "React";
const element2 = <p>Hello, {name}!</p>;

// 3. JSX 属性 (className, style)
const styles = {
    color: 'blue',
    fontSize: '20px'
};
const element3 = <div className="jsx-styled-div" style={styles}>This div is styled with JSX attributes.</div>;

// 4. JSX 中的子元素
const element4 = (
    <div>
        <h2>JSX 子元素</h2>
        <p>这是一个段落。</p>
        <ul>
            <li>列表项 1</li>
            <li>列表项 2</li>
        </ul>
    </div>
);

// 5. 函数组件返回 JSX
function Greeting(props) {
    return <p>Greetings from {props.framework}!</p>;
}

// 组合所有 JSX 元素
function App() {
    return (
        <div className="jsx-container">
            <h2>React JSX 示例</h2>
            {element1}
            {element2}
            {element3}
            {element4}
            <Greeting framework="React" />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);