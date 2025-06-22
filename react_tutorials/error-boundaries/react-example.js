// react-example.js
// React 错误边界示例

import { useState } from 'react';

// 1. 错误边界组件 (类组件)
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你也可以将错误日志上报给服务器
        console.error("React Error Boundary Caught an error:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // 你可以渲染任何自定义的降级 UI
            return (
                <div className="error-fallback">
                    <h3>Something went wrong.</h3>
                    <p>We are sorry for the inconvenience.</p>
                    {this.props.showDetails && (
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}

// 2. 会抛出错误的组件
function BuggyCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(prevCount => prevCount + 1);
    };

    if (count === 5) {
        // 模拟一个错误
        throw new Error('I crashed at count 5!');
    }

    return (
        <div className="error-card">
            <h4>Buggy Counter</h4>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
            <p>Click until count reaches 5 to see the error.</p>
        </div>
    );
}

// 组合组件
function App() {
    return (
        <div>
            <h2>React 错误边界示例</h2>

            <div className="error-boundary-section">
                <h3>使用错误边界捕获错误</h3>
                <ErrorBoundary showDetails={true}>
                    <BuggyCounter />
                </ErrorBoundary>
            </div>

            <hr />

            <div className="error-boundary-section">
                <h3>没有错误边界的组件 (会使整个应用崩溃)</h3>
                <p>下面的计数器没有错误边界，点击到 5 时会使整个 React 应用崩溃。</p>
                <BuggyCounter /> {/* 这个组件没有被错误边界包裹 */}
            </div>

            <hr />

            <div className="error-boundary-section">
                <h3>多个错误边界</h3>
                <p>每个错误边界只捕获其子树中的错误。</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <ErrorBoundary>
                        <BuggyCounter />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <BuggyCounter />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);