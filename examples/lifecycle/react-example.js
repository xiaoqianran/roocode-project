// react-example.js
// React 生命周期示例

import { useState, useEffect } from 'react';

// 1. 函数组件生命周期 (useEffect)
function FunctionalLifecycleComponent() {
    const [count, setCount] = useState(0);

    // componentDidMount 和 componentDidUpdate
    useEffect(() => {
        console.log('Functional Component: Mounted or Updated. Count:', count);
        // 模拟数据获取
        const timer = setTimeout(() => {
            console.log('Functional Component: Data fetched after 2 seconds.');
        }, 2000);

        // componentWillUnmount (清理函数)
        return () => {
            clearTimeout(timer);
            console.log('Functional Component: Clean up (will unmount or re-run effect).');
        };
    }, [count]); // 依赖数组，只有当 count 改变时才重新运行 effect

    return (
        <div className="lifecycle-card">
            <h3>React 函数组件生命周期 (useEffect)</h3>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <p>Check console for lifecycle logs.</p>
        </div>
    );
}

// 2. 类组件生命周期
class ClassLifecycleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Initial Message'
        };
        console.log('Class Component: Constructor - Component is being constructed.');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('Class Component: getDerivedStateFromProps - Before render, based on props/state.');
        // 可以在这里根据 props 更新 state
        return null; // 不更新 state
    }

    componentDidMount() {
        console.log('Class Component: componentDidMount - Component mounted to DOM.');
        // 适合进行数据获取、订阅事件等
        this.timer = setTimeout(() => {
            this.setState({ message: 'Message updated after mount!' });
            console.log('Class Component: State updated in componentDidMount.');
        }, 1500);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Class Component: shouldComponentUpdate - Deciding whether to re-render.');
        // 性能优化点：如果返回 false，则组件不会重新渲染
        return true; // 总是重新渲染
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Class Component: getSnapshotBeforeUpdate - Before DOM update, capture scroll position etc.');
        return null; // 不返回任何快照
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Class Component: componentDidUpdate - Component updated in DOM.');
        // 适合在更新后操作 DOM 或进行网络请求
        if (prevState.message !== this.state.message) {
            console.log('Class Component: Message state changed.');
        }
    }

    componentWillUnmount() {
        console.log('Class Component: componentWillUnmount - Component is about to be unmounted.');
        // 适合进行清理工作，如取消订阅、清除定时器
        clearTimeout(this.timer);
    }

    render() {
        console.log('Class Component: Render - Component is rendering.');
        return (
            <div className="lifecycle-card">
                <h3>React 类组件生命周期</h3>
                <p>{this.state.message}</p>
                <button onClick={() => this.setState({ message: 'New Message ' + Math.random().toFixed(2) })}>
                    Update Message
                </button>
                <p>Check console for lifecycle logs.</p>
            </div>
        );
    }
}

// 组合组件
function App() {
    const [showClassComponent, setShowClassComponent] = useState(true);

    return (
        <div>
            <h2>React 生命周期示例</h2>
            <FunctionalLifecycleComponent />
            <hr />
            <button onClick={() => setShowClassComponent(!showClassComponent)}>
                {showClassComponent ? 'Hide Class Component' : 'Show Class Component'}
            </button>
            {showClassComponent && <ClassLifecycleComponent />}
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);