// react-example.js
// React Context 示例

import { useContext, useState } from 'react';

// 1. 创建 Context
const ThemeContext = React.createContext('light'); // 默认值为 'light'
const UserContext = React.createContext({ name: 'Guest', isAuthenticated: false });

// 2. 消费 Context 的组件 (使用 useContext Hook)
function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button className={`button-${theme}`}>
            Themed Button ({theme} theme)
        </button>
    );
}

function UserInfoDisplay() {
    const user = useContext(UserContext);
    return (
        <p>User: {user.name} ({user.isAuthenticated ? 'Authenticated' : 'Not Authenticated'})</p>
    );
}

// 3. 中间组件，不直接使用 Context，但传递给子组件
function Toolbar() {
    return (
        <div className="toolbar">
            <ThemedButton />
            <UserInfoDisplay />
        </div>
    );
}

// 4. 提供 Context 的组件 (Context.Provider)
function App() {
    const [theme, setTheme] = useState('light');
    const [currentUser, setCurrentUser] = useState({ name: 'Alice', isAuthenticated: true });

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const login = () => {
        setCurrentUser({ name: 'Bob', isAuthenticated: true });
    };

    const logout = () => {
        setCurrentUser({ name: 'Guest', isAuthenticated: false });
    };

    return (
        <div>
            <h2>React Context 示例</h2>
            <div className="context-card">
                <h3>主题 Context</h3>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <ThemeContext.Provider value={theme}>
                    <Toolbar />
                </ThemeContext.Provider>
            </div>

            <hr />

            <div className="context-card">
                <h3>用户 Context</h3>
                <UserContext.Provider value={currentUser}>
                    <Toolbar />
                </UserContext.Provider>
                <button onClick={login}>Login as Bob</button>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);