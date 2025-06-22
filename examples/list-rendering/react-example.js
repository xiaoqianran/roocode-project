// react-example.js
// React 列表渲染示例

// 1. 渲染数字列表
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <div className="list-card">
            <h3>React 数字列表</h3>
            <ul>{listItems}</ul>
        </div>
    );
}

// 2. 渲染对象数组列表
function UserListItem(props) {
    return (
        <li>
            {props.user.name} (ID: {props.user.id})
        </li>
    );
}

function UserList(props) {
    const users = props.users;
    return (
        <div className="list-card">
            <h3>React 用户列表</h3>
            <ul>
                {users.map(user => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
}

// 3. 列表项直接在 JSX 中
function SimpleList() {
    const items = ['Apple', 'Banana', 'Cherry'];
    return (
        <div className="list-card">
            <h3>React 简单列表</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li> // 建议使用稳定ID作为key，这里仅为示例
                ))}
            </ul>
        </div>
    );
}


// 组合组件
function App() {
    const numbers = [1, 2, 3, 4, 5];
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];

    return (
        <div>
            <h2>React 列表渲染示例</h2>
            <NumberList numbers={numbers} />
            <hr />
            <UserList users={users} />
            <hr />
            <SimpleList />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);