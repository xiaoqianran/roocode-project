// react-example.js
// React Hooks 示例

import { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';

// 模拟一个外部 API
const ChatAPI = {
    subscribeToFriendStatus: (friendId, callback) => {
        console.log(`Subscribing to friend ${friendId} status.`);
        const isOnline = friendId % 2 === 0; // 偶数 ID 在线
        setTimeout(() => callback({ isOnline }), 1000);
        return () => console.log(`Unsubscribing from friend ${friendId} status.`);
    },
    unsubscribeFromFriendStatus: (friendId, callback) => {
        console.log(`Unsubscribing from friend ${friendId} status.`);
    }
};

// 1. useState Hook
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="hook-card">
            <h3>useState Hook (计数器)</h3>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

// 2. useEffect Hook (数据获取和清理)
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        console.log(`useEffect: Subscribing to friend ${props.friendId}`);
        const handleStatusChange = (status) => {
            setIsOnline(status.isOnline);
        };

        ChatAPI.subscribeToFriendStatus(props.friendId, handleStatusChange);

        return () => {
            console.log(`useEffect: Cleaning up subscription for friend ${props.friendId}`);
            ChatAPI.unsubscribeFromFriendStatus(props.friendId, handleStatusChange);
        };
    }, [props.friendId]); // 依赖 props.friendId

    if (isOnline === null) {
        return <p>Loading...</p>;
    }
    return <p>Friend {props.friendId} is {isOnline ? 'Online' : 'Offline'}</p>;
}

// 3. useContext Hook
const ThemeContext = React.createContext('light'); // 创建 Context

function ThemedButton() {
    const theme = useContext(ThemeContext); // 消费 Context
    return (
        <button className={`button-${theme}`}>
            Themed Button ({theme} theme)
        </button>
    );
}

// 4. useRef Hook (访问 DOM 元素)
function TextInputWithFocusButton() {
    const inputEl = useRef(null);

    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };

    return (
        <div className="hook-card">
            <h3>useRef Hook (DOM 访问)</h3>
            <input ref={inputEl} type="text" placeholder="Focus me!" />
            <button onClick={onButtonClick}>Focus the input</button>
        </div>
    );
}

// 5. useCallback Hook (记忆化回调函数)
function ParentComponentWithCallback() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // 只有当 count 改变时，这个函数才会被重新创建
    const memoizedCallback = useCallback(() => {
        console.log('Callback executed. Count:', count);
        // 假设这里有一些昂贵的操作依赖于 count
    }, [count]);

    return (
        <div className="hook-card">
            <h3>useCallback Hook</h3>
            <p>Parent Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type to re-render parent" />
            <ChildComponentWithCallback onClick={memoizedCallback} />
        </div>
    );
}

function ChildComponentWithCallback({ onClick }) {
    console.log('ChildComponentWithCallback rendered');
    return <button onClick={onClick}>Execute Memoized Callback</button>;
}
// 使用 React.memo 优化子组件，只有当 props 改变时才重新渲染
const MemoizedChildComponentWithCallback = React.memo(ChildComponentWithCallback);


// 6. useMemo Hook (记忆化计算值)
function ExpensiveCalculationComponent() {
    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(2);

    // 只有当 num1 或 num2 改变时，才重新计算 expensiveResult
    const expensiveResult = useMemo(() => {
        console.log('Calculating expensive result...');
        let result = 0;
        for (let i = 0; i < 100000000; i++) { // 模拟昂贵的计算
            result += num1 * num2;
        }
        return result;
    }, [num1, num2]);

    return (
        <div className="hook-card">
            <h3>useMemo Hook</h3>
            <p>Num1: {num1}</p>
            <p>Num2: {num2}</p>
            <p>Expensive Result: {expensiveResult}</p>
            <button onClick={() => setNum1(num1 + 1)}>Increment Num1</button>
            <button onClick={() => setNum2(num2 + 1)}>Increment Num2</button>
        </div>
    );
}


// 7. 自定义 Hook
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // 空依赖数组，只在挂载和卸载时运行

    return width;
}

function WindowWidthDisplay() {
    const width = useWindowWidth();
    return (
        <div className="hook-card">
            <h3>自定义 Hook (useWindowWidth)</h3>
            <p>Window Width: {width}px</p>
            <p>Resize your browser window to see the effect.</p>
        </div>
    );
}


// 组合所有 Hook 示例
function App() {
    return (
        <div>
            <h2>React Hooks 示例</h2>
            <Counter />
            <hr />
            <div className="hook-card">
                <h3>useEffect Hook (朋友状态)</h3>
                <FriendStatus friendId={1} /> {/* 在线 */}
                <FriendStatus friendId={2} /> {/* 离线 */}
            </div>
            <hr />
            <div className="hook-card">
                <h3>useContext Hook</h3>
                <ThemeContext.Provider value="dark">
                    <ThemedButton />
                </ThemeContext.Provider>
                <ThemeContext.Provider value="light">
                    <ThemedButton />
                </ThemeContext.Provider>
            </div>
            <hr />
            <TextInputWithFocusButton />
            <hr />
            <ParentComponentWithCallback />
            <hr />
            <ExpensiveCalculationComponent />
            <hr />
            <WindowWidthDisplay />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);