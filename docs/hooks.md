# Hook (React Hooks)

**React Hooks** 是在 React 16.8 版本中引入的一项强大功能，它允许你在不编写类的情况下使用状态 (State) 和其他 React 特性。Hooks 彻底改变了函数组件的开发方式，使得函数组件能够拥有类组件的许多能力，同时保持了函数组件的简洁性。

## 为什么使用 Hooks？

在 Hooks 出现之前，如果你需要在组件中管理状态或使用生命周期方法，你必须使用类组件。这导致了以下问题：

*   **逻辑复用困难**: 很难在组件之间复用有状态的逻辑。你可能需要使用高阶组件 (HOC) 或 Render Props 模式，这会增加组件树的嵌套深度和复杂性。
*   **复杂组件难以理解**: 类组件中的生命周期方法通常包含不相关的逻辑（例如，`componentDidMount` 中可能包含数据获取和事件监听），使得代码难以理解和测试。
*   **`this` 的困扰**: 类组件中 `this` 的绑定问题常常让初学者感到困惑。

Hooks 旨在解决这些问题，它允许你：

*   **在函数组件中使用状态**: 通过 `useState` Hook。
*   **在函数组件中执行副作用**: 通过 `useEffect` Hook。
*   **更轻松地复用有状态逻辑**: 通过自定义 Hook。
*   **避免类组件的复杂性**: 无需关心 `this` 的绑定和复杂的生命周期方法。

## Hooks 与传统 HTML/CSS/JS 的对比

Hooks 是 React 特有的抽象，没有直接的传统 JavaScript 对应概念。它们旨在简化函数组件中的状态逻辑复用，提供了一种更声明式和函数式的方式来管理组件行为。

## 常用 React Hooks

React 提供了许多内置的 Hooks，用于处理不同的场景。

### 1. `useState`

`useState` 是最基本的 Hook，用于在函数组件中添加状态。它返回一个数组，其中包含当前状态值和一个更新该状态的函数。

```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0); // count 是状态值，setCount 是更新函数

    const increment = () => {
        setCount(count + 1); // 更新 count
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}
```

### 2. `useEffect`

`useEffect` Hook 允许你在函数组件中执行副作用。副作用是指那些在组件渲染后发生的操作，例如数据获取、订阅、手动更改 DOM 或设置定时器。

`useEffect` 接收两个参数：一个回调函数（副作用函数）和一个可选的依赖数组。

*   **无依赖数组**: 副作用会在每次渲染后执行。
*   **空依赖数组 `[]`**: 副作用只会在组件首次挂载后执行一次，并在组件卸载时执行清理函数（如果返回了清理函数）。这类似于类组件的 `componentDidMount` 和 `componentWillUnmount`。
*   **有依赖数组 `[dep1, dep2]`**: 副作用会在组件首次挂载后执行一次，并在依赖数组中的任何值发生变化时重新执行。清理函数会在下一次 effect 运行之前或组件卸载时执行。这类似于 `componentDidMount` 和 `componentDidUpdate` 的组合。

```jsx
import { useEffect, useState } from 'react';

function MyComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Component mounted or updated. Count:", count);

        // 模拟数据获取
        const timer = setTimeout(() => {
            console.log("Data fetched after 2 seconds.");
        }, 2000);

        // 清理函数 (相当于 componentWillUnmount 或在下一次 effect 运行前执行)
        return () => {
            clearTimeout(timer);
            console.log("Clean up (will unmount or re-run effect).");
        };
    }, [count]); // 依赖数组，只有当 count 改变时才重新运行 effect

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

### 3. `useContext`

`useContext` Hook 允许你订阅 React Context。Context 提供了一种在组件树中共享数据的方式，而无需通过 props 逐层手动传递。

```jsx
import React, { useContext } from 'react';

// 假设 ThemeContext 已经创建
const ThemeContext = React.createContext('light');

function ThemedButton() {
    const theme = useContext(ThemeContext); // 消费 Context
    return <button className={theme}>I am themed</button>;
}

function App() {
    return (
        <ThemeContext.Provider value="dark"> {/* 提供 Context 值 */}
            <ThemedButton />
        </ThemeContext.Provider>
    );
}
```

### 4. `useRef`

`useRef` Hook 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。它主要用于：

*   访问 DOM 节点。
*   在渲染之间持久化可变值，而不会引起重新渲染。

```jsx
import { useRef } from 'react';

function MyInput() {
    const inputRef = useRef(null); // 创建一个 ref

    const handleClick = () => {
        inputRef.current.focus(); // 通过 ref 访问 DOM 元素并调用其方法
    };

    return (
        <div>
            <input type="text" ref={inputRef} /> {/* 将 ref 绑定到 DOM 元素 */}
            <button onClick={handleClick}>Focus Input</button>
        </div>
    );
}
```

### 5. `useCallback` 和 `useMemo` (性能优化)

*   **`useCallback`**: 记忆化回调函数。它返回一个记忆化的回调函数，只有当其依赖项发生变化时，才会重新创建该函数。这对于将回调函数传递给优化过的子组件（例如使用 `React.memo` 的组件）非常有用，可以防止不必要的重新渲染。

    ```jsx
    import { useState, useCallback } from 'react';

    function ParentComponent() {
        const [count, setCount] = useState(0);

        // 只有当 count 改变时，才会重新创建 handleClick 函数
        const handleClick = useCallback(() => {
            console.log('Button clicked! Count:', count);
        }, [count]);

        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <ChildButton onClick={handleClick} /> {/* 将记忆化的函数传递给子组件 */}
            </div>
        );
    }

    const ChildButton = React.memo(({ onClick }) => {
        console.log('ChildButton rendered');
        return <button onClick={onClick}>Child Button</button>;
    });
    ```

*   **`useMemo`**: 记忆化计算结果。它返回一个记忆化的值，只有当其依赖项发生变化时，才会重新计算该值。这对于执行昂贵的计算并避免在每次渲染时重复计算非常有用。

    ```jsx
    import { useState, useMemo } from 'react';

    function ExpensiveCalculationComponent() {
        const [count, setCount] = useState(0);
        const [multiplier, setMultiplier] = useState(2);

        // 只有当 count 或 multiplier 改变时，才会重新计算 expensiveValue
        const expensiveValue = useMemo(() => {
            console.log('Calculating expensive value...');
            return count * multiplier * 1000;
        }, [count, multiplier]);

        return (
            <div>
                <p>Count: {count}</p>
                <p>Multiplier: {multiplier}</p>
                <p>Expensive Value: {expensiveValue}</p>
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
                <button onClick={() => setMultiplier(multiplier + 1)}>Increment Multiplier</button>
            </div>
        );
    }
    ```

### 6. 自定义 Hook

自定义 Hook 是一个 JavaScript 函数，其名称以 `use` 开头，并且可以调用其他 Hook。它们允许你将组件逻辑（如状态逻辑或副作用）提取到可重用的函数中。

```jsx
import { useState, useEffect } from 'react';

// 自定义 Hook：用于获取朋友在线状态
function useFriendStatus(friendId) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        // 模拟 API 调用
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        // 假设 ChatAPI 存在
        // ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);

        return () => {
            // ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
        };
    }, [friendId]); // 依赖 friendId

    return isOnline;
}

function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id); // 使用自定义 Hook

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name} - {isOnline ? 'Online' : 'Offline'}
        </li>
    );
}
```

## Hooks 的规则

在使用 Hooks 时，必须遵循以下两个基本规则：

1.  **只在 React 函数中调用 Hook**:
    *   在 React 函数组件中调用 Hook。
    *   在自定义 Hook 中调用 Hook。
    *   不要在普通的 JavaScript 函数中调用 Hook。
    *   不要在类组件中调用 Hook。

2.  **只在顶层调用 Hook**:
    *   不要在循环、条件语句或嵌套函数中调用 Hook。
    *   确保 Hook 在每次渲染时都以相同的顺序被调用。

## 总结

React Hooks 提供了一种强大、灵活且简洁的方式来在函数组件中管理状态和副作用。它们解决了类组件的许多痛点，并促进了逻辑的复用和代码的清晰性。掌握 Hooks 是现代 React 开发的关键。