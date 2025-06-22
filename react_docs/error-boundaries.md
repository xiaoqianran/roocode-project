# 错误边界 (Error Boundaries)

在 React 应用中，JavaScript 错误可能会导致整个组件树崩溃，留下一个空白屏幕。**错误边界 (Error Boundaries)** 是一种 React 组件，它可以捕获其子组件树中 JavaScript 错误，记录错误，并显示备用 UI，而不是使整个应用崩溃。

## 为什么使用错误边界？

错误边界提供了一种健壮的方式来处理 UI 中的运行时错误，从而提高应用的稳定性和用户体验。它们允许你：

*   **防止应用崩溃**: 当子组件发生错误时，错误边界可以捕获它，并显示一个友好的错误消息，而不是让整个应用失效。
*   **隔离错误**: 错误边界只捕获其子树中的错误，不会影响应用的其他部分。
*   **记录错误**: 你可以在错误边界中记录错误信息，以便进行调试和分析。
*   **提供降级 UI**: 在发生错误时，可以向用户显示一个备用的 UI，提供更好的用户体验。

## 错误边界与传统 HTML/CSS/JS 的对比

错误边界的概念类似于 JavaScript 中的 `try...catch` 块，但专门用于 UI 组件树中的错误。传统的 `try...catch` 只能捕获同步代码中的错误，而不能捕获 React 组件渲染过程中（例如事件处理函数中异步抛出的错误）的错误。

### 传统 JavaScript 示例

在纯 JavaScript 中，你通常使用 `try...catch` 来捕获同步代码中的错误。对于异步错误或 UI 渲染中的错误，你需要更复杂的全局错误处理机制（如 `window.onerror`）。

请参考 [`examples/error-boundaries/vanilla-example.js`](examples/error-boundaries/vanilla-example.js:12-33) 中的模拟错误边界示例：

```javascript
// examples/error-boundaries/vanilla-example.js
function createVanillaErrorBoundary(childComponentCreator, showDetails = false) {
    const container = document.createElement('div');
    try {
        childElement = childComponentCreator();
        container.appendChild(childElement);
    } catch (error) {
        console.error("Vanilla Error Caught an error:", error);
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'error-fallback';
        const h3 = document.createElement('h3');
        h3.textContent = 'Something went wrong.';
        fallbackDiv.appendChild(h3);
        // ... 显示错误信息
        container.appendChild(fallbackDiv);
    }
    return container;
}
```

### React 错误边界示例

React 错误边界是类组件，通过实现特定的生命周期方法来捕获错误。

请参考 [`examples/error-boundaries/react-example.js`](examples/error-boundaries/react-example.js:7-45) 中的错误边界组件示例：

```jsx
// examples/error-boundaries/react-example.js
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
```

## React 错误边界的实现方式

错误边界是一个类组件，它通过实现以下一个或两个生命周期方法来成为错误边界：

1.  **`static getDerivedStateFromError(error)`**:
    *   这是一个静态方法，在子组件抛出错误后，在渲染阶段被调用。
    *   它接收抛出的错误作为参数。
    *   它应该返回一个对象来更新 state，从而使下一次渲染能够显示降级 UI。

2.  **`componentDidCatch(error, errorInfo)`**:
    *   在子组件抛出错误后，在提交阶段被调用。
    *   它接收两个参数：`error`（抛出的错误）和 `errorInfo`（一个包含 `componentStack` 键的对象，表示组件栈信息）。
    *   你可以在这里执行副作用，例如将错误日志上报到服务器。

### 如何使用错误边界

要使用错误边界，你需要将其包裹在你想要保护的组件树周围。如果被包裹的组件（或其任何子组件）在渲染、生命周期方法或构造函数中抛出错误，错误边界就会捕获这个错误。

```jsx
import React from 'react';
import ErrorBoundary from './ErrorBoundary'; // 导入你定义的错误边界组件

function MyProblematicComponent() {
    // 这个组件可能会在某个时候抛出错误
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
        setCount(prevCount => prevCount + 1);
    };

    if (count === 5) {
        throw new Error('I crashed at count 5!');
    }

    return (
        <div className="error-card">
            <h4>Problematic Counter</h4>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
}

function App() {
    return (
        <div>
            <h1>My Application</h1>
            <ErrorBoundary> {/* 包裹你想要保护的组件 */}
                <MyProblematicComponent />
            </ErrorBoundary>
            <p>This part of the application will not crash if the above component fails.</p>
        </div>
    );
}
```

### 错误边界的局限性

错误边界**不会**捕获以下类型的错误：

*   事件处理函数中的错误 (例如 `onClick` 中的错误)。你可以在事件处理函数内部使用普通的 `try...catch`。
*   异步代码中的错误 (例如 `setTimeout` 或 `fetch` 回调中的错误)。
*   服务端渲染中的错误。
*   错误边界自身抛出的错误。

## 总结

错误边界是 React 提供的一种强大机制，用于优雅地处理 UI 中的 JavaScript 错误。通过实现 `static getDerivedStateFromError()` 和 `componentDidCatch()` 方法，错误边界可以捕获子组件树中的错误，显示降级 UI，并记录错误信息，从而显著提高 React 应用的健壮性和用户体验。