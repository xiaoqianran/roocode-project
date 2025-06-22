# 生命周期 (Lifecycle)

在 React 中，组件从被创建到最终从 DOM 中移除，会经历一系列的阶段。这些阶段被称为组件的“生命周期”。React 提供了特定的方法（对于类组件）或 Hook（对于函数组件），允许你在这些生命周期的特定时间点执行代码，从而控制组件的行为和副作用。

## 为什么理解生命周期很重要？

理解组件生命周期对于以下方面至关重要：

*   **数据获取**: 在组件挂载后进行网络请求。
*   **DOM 操作**: 在组件渲染后直接操作 DOM（尽管通常应避免）。
*   **事件订阅与清理**: 在组件挂载时订阅事件，并在组件卸载时取消订阅，以防止内存泄漏。
*   **性能优化**: 在组件更新前决定是否需要重新渲染。

## 生命周期与传统 HTML/CSS/JS 的对比

在传统 JavaScript 中，你可能需要手动监听 `DOMContentLoaded` 事件来知道页面何时加载完成，或者使用 `MutationObserver` 来观察 DOM 变化。手动管理 DOM 元素的创建、更新和销毁通常需要复杂的逻辑。

### 传统 JavaScript 示例

在纯 JavaScript 中，你需要手动管理 DOM 元素的生命周期，包括创建、更新和销毁，以及相关的副作用（如定时器）。

请参考 [`examples/lifecycle/vanilla-example.js`](examples/lifecycle/vanilla-example.js:51-75) 中的模拟生命周期示例：

```javascript
// examples/lifecycle/vanilla-example.js
function mount() {
    vanillaRoot.appendChild(render());
    console.log('Vanilla Component: Mounted to DOM.');
    timer = setTimeout(() => { // 模拟数据获取
        console.log('Vanilla Component: Data fetched after 2 seconds.');
    }, 2000);
}

function update() {
    console.log('Vanilla Component: Updated (manual DOM update).');
    updateContent();
}

function unmount() {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        console.log('Vanilla Component: Removed from DOM (simulating unmount).');
    }
    clearTimeout(timer); // 清理定时器
    console.log('Vanilla Component: Clean up (timer cleared).');
}
```

### React 生命周期示例

React 提供了声明式的生命周期方法和 Hook，让你可以在组件的不同阶段执行代码，而无需手动操作 DOM。

请参考 [`examples/lifecycle/react-example.js`](examples/lifecycle/react-example.js:11-23) 和 [`examples/lifecycle/react-example.js`](examples/lifecycle/react-example.js:36-98) 中的示例：

```jsx
// examples/lifecycle/react-example.js
// 函数组件生命周期 (useEffect)
useEffect(() => {
    console.log('Functional Component: Mounted or Updated. Count:', count);
    const timer = setTimeout(() => {
        console.log('Functional Component: Data fetched after 2 seconds.');
    }, 2000);

    return () => { // 清理函数，相当于 componentWillUnmount
        clearTimeout(timer);
        console.log('Functional Component: Clean up (will unmount or re-run effect).');
    };
}, [count]); // 依赖数组

// 类组件生命周期
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
        return null;
    }

    componentDidMount() {
        console.log('Class Component: componentDidMount - Component mounted to DOM.');
        this.timer = setTimeout(() => {
            this.setState({ message: 'Message updated after mount!' });
            console.log('Class Component: State updated in componentDidMount.');
        }, 1500);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Class Component: shouldComponentUpdate - Deciding whether to re-render.');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Class Component: getSnapshotBeforeUpdate - Before DOM update, capture scroll position etc.');
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Class Component: componentDidUpdate - Component updated in DOM.');
        if (prevState.message !== this.state.message) {
            console.log('Class Component: Message state changed.');
        }
    }

    componentWillUnmount() {
        console.log('Class Component: componentWillUnmount - Component is about to be unmounted.');
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
```

## React 生命周期的实现方式

React 组件的生命周期可以分为三个主要阶段：挂载 (Mounting)、更新 (Updating) 和卸载 (Unmounting)。

### 1. 挂载阶段 (Mounting)

当组件实例被创建并插入到 DOM 中时，会发生挂载。

*   **类组件方法**:
    *   `constructor()`: 组件被创建时调用，用于初始化 state 和绑定事件处理函数。
    *   `static getDerivedStateFromProps()`: 在 `render()` 之前调用，根据 props 更新 state。
    *   `render()`: 渲染组件的 JSX。
    *   `componentDidMount()`: 组件挂载到 DOM 后立即调用。适合进行数据获取、设置订阅、直接操作 DOM。

*   **函数组件 Hook**:
    *   `useEffect(callback, [])`: 当依赖数组为空 `[]` 时，`useEffect` 的行为类似于 `componentDidMount`。回调函数只会在组件首次渲染后执行一次。

### 2. 更新阶段 (Updating)

当组件的 props 或 state 发生变化时，会发生更新。

*   **类组件方法**:
    *   `static getDerivedStateFromProps()`: 再次调用。
    *   `shouldComponentUpdate(nextProps, nextState)`: 在重新渲染之前调用，用于性能优化。如果返回 `false`，则组件不会重新渲染。
    *   `render()`: 再次渲染组件的 JSX。
    *   `getSnapshotBeforeUpdate(prevProps, prevState)`: 在最近一次渲染输出被提交到 DOM 之前调用。可以捕获 DOM 信息（如滚动位置）。
    *   `componentDidUpdate(prevProps, prevState, snapshot)`: 组件更新到 DOM 后立即调用。适合在更新后操作 DOM 或进行网络请求。

*   **函数组件 Hook**:
    *   `useEffect(callback, [dependencies])`: 当依赖数组中的任何值发生变化时，`useEffect` 的回调函数会重新运行。

### 3. 卸载阶段 (Unmounting)

当组件从 DOM 中移除时，会发生卸载。

*   **类组件方法**:
    *   `componentWillUnmount()`: 组件即将被卸载和销毁之前调用。适合进行清理工作，如取消网络请求、清除定时器、取消订阅。

*   **函数组件 Hook**:
    *   `useEffect` 的返回函数: `useEffect` 的回调函数可以返回一个清理函数。这个清理函数会在组件卸载时执行，或者在下一次 effect 运行之前执行（如果依赖项发生变化）。

    ```jsx
    useEffect(() => {
        // 订阅事件
        const subscription = someApi.subscribe();

        return () => {
            // 清理函数：取消订阅
            subscription.unsubscribe();
        };
    }, []); // 空数组表示只在挂载和卸载时运行
    ```

## 总结

React 的生命周期机制为开发者提供了在组件不同阶段执行代码的能力。无论是使用类组件的生命周期方法还是函数组件的 `useEffect` Hook，理解这些阶段对于管理组件的副作用、优化性能和防止内存泄漏都至关重要。