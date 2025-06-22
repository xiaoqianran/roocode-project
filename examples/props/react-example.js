// react-example.js
// React Props 示例

// 1. 接收并显示 Props 的函数组件
function UserCard(props) {
    return (
        <div className="props-card">
            <h3>React Props 示例</h3>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Occupation: {props.occupation}</p>
            {props.children} {/* 渲染 children prop */}
        </div>
    );
}

// 2. 带有默认 Props 的组件
function Greeting(props) {
    return (
        <p>Hello, {props.name}!</p>
    );
}
Greeting.defaultProps = {
    name: "Guest"
};

// 3. 父组件向子组件传递 Props
function App() {
    const userData = {
        name: "Alice",
        age: 30,
        occupation: "Software Engineer"
    };

    return (
        <div>
            <h2>React Props 示例</h2>
            <UserCard name={userData.name} age={userData.age} occupation={userData.occupation}>
                <p>This is a child element passed as <code>children</code> prop.</p>
            </UserCard>
            <UserCard name="Bob" age={25} occupation="Designer" />
            <UserCard name="Charlie" /> {/* 使用默认 props */}
            <Greeting /> {/* 使用默认 props */}
            <Greeting name="David" />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);