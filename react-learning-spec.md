# React 学习规范

本规范旨在为学习 React 提供一个结构化的指南，详细列出 React 的核心功能，并将其与传统的 HTML/CSS/JS 概念进行对比，阐述其实现方式。此规范将作为后续编写 React 示例代码和教程文档的基础。

## 1. 组件 (Components)

*   **React 概念**: React 应用的基本构建块，封装了 UI 和其行为。组件可以是函数组件或类组件。
*   **HTML/CSS/JS 对应概念**: 类似于可重用的 HTML 模板、Web Components 或 JavaScript 中的模块化 UI 片段（例如，一个函数返回一个 DOM 元素）。
*   **实现方式**:
    *   **函数组件**: 一个 JavaScript 函数，接收 `props` 作为参数，并返回 JSX。
        ```pseudocode
        FUNCTION MyComponent(props)
            RETURN JSX_ELEMENT // 描述 UI
        END FUNCTION
        ```
    *   **类组件**: 一个 JavaScript 类，继承自 `React.Component`，包含 `render()` 方法返回 JSX。
        ```pseudocode
        CLASS MyComponent EXTENDS React.Component
            METHOD render()
                RETURN JSX_ELEMENT // 描述 UI
            END METHOD
        END CLASS
        ```
    *   **模块化**: 每个组件通常在一个单独的文件中定义并导出。
        ```pseudocode
        // file: components/Button.js
        IMPORT React
        FUNCTION Button(props)
            // ...
        END FUNCTION
        EXPORT DEFAULT Button
        ```

## 2. JSX (JavaScript XML)

*   **React 概念**: 一种 JavaScript 的语法扩展，允许在 JavaScript 代码中编写类似 HTML 的结构。它最终会被 Babel 编译成 `React.createElement()` 调用。
*   **HTML/CSS/JS 对应概念**: 类似于直接在 HTML 文件中编写标签，或者在 JavaScript 中使用 `document.createElement()` 和 `appendChild()` 手动创建 DOM 元素。
*   **实现方式**:
    ```pseudocode
    // JSX 示例
    CONST element = <h1>Hello, world!</h1>;

    // 编译后的 JavaScript (概念上)
    CONST element = React.createElement('h1', null, 'Hello, world!');
    ```
    *   **表达式嵌入**: 使用花括号 `{}` 在 JSX 中嵌入 JavaScript 表达式。
        ```pseudocode
        CONST name = "React";
        CONST greeting = <p>Hello, {name}</p>;
        ```
    *   **属性**: JSX 属性使用驼峰命名法（例如 `className` 而不是 `class`）。
        ```pseudocode
        CONST divElement = <div className="container"></div>;
        ```

## 3. 状态 (State)

*   **React 概念**: 组件内部管理的数据，用于存储组件的私有数据，当状态改变时，组件会重新渲染。
*   **HTML/CSS/JS 对应概念**: 类似于 JavaScript 变量，但 React 的状态管理提供了响应式更新机制。在传统 JS 中，需要手动操作 DOM 来反映数据变化。
*   **实现方式**:
    *   **函数组件 (使用 Hooks)**: 使用 `useState` Hook。
        ```pseudocode
        IMPORT { useState } FROM 'react';

        FUNCTION Counter()
            CONST [count, setCount] = useState(0); // 初始化状态

            FUNCTION increment()
                setCount(count + 1); // 更新状态
            END FUNCTION

            RETURN (
                <div>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Increment</button>
                </div>
            );
        END FUNCTION
        ```
    *   **类组件**: 在构造函数中初始化 `this.state`，使用 `this.setState()` 更新状态。
        ```pseudocode
        CLASS Counter EXTENDS React.Component
            CONSTRUCTOR(props)
                SUPER(props);
                THIS.state = { count: 0 }; // 初始化状态
            END CONSTRUCTOR

            METHOD increment()
                THIS.setState({ count: THIS.state.count + 1 }); // 更新状态
            END METHOD

            METHOD render()
                RETURN (
                    <div>
                        <p>Count: {THIS.state.count}</p>
                        <button onClick={THIS.increment}>Increment</button>
                    </div>
                );
            END METHOD
        END CLASS
        ```
    *   **状态不可变性**: 直接修改状态对象是禁止的，必须使用 `setState` 或 `useState` 的更新函数。

## 4. Props (Properties)

*   **React 概念**: 从父组件传递给子组件的数据，用于组件之间的通信。Props 是只读的，子组件不能修改它们。
*   **HTML/CSS/JS 对应概念**: 类似于 HTML 元素的属性（attributes），或者函数参数。
*   **实现方式**:
    *   **传递 Props**: 在父组件中将数据作为属性传递给子组件。
        ```pseudocode
        // ParentComponent.js
        IMPORT React
        IMPORT ChildComponent FROM './ChildComponent'

        FUNCTION ParentComponent()
            CONST message = "Hello from Parent!";
            RETURN <ChildComponent text={message} />;
        END FUNCTION
        ```
    *   **接收 Props**: 在子组件中通过 `props` 参数（函数组件）或 `this.props`（类组件）接收。
        ```pseudocode
        // ChildComponent.js
        FUNCTION ChildComponent(props)
            RETURN <p>{props.text}</p>;
        END FUNCTION
        ```
    *   **默认 Props**: 可以为 props 定义默认值。
        ```pseudocode
        FUNCTION Greet(props)
            RETURN <p>Hello, {props.name}</p>;
        END FUNCTION
        Greet.defaultProps = {
            name: "Guest"
        };
        ```

## 5. 事件处理 (Event Handling)

*   **React 概念**: React 元素上的事件处理与 DOM 元素类似，但使用驼峰命名法（例如 `onClick` 而不是 `onclick`），并且传递的是函数引用而不是字符串。
*   **HTML/CSS/JS 对应概念**: 类似于在 HTML 中使用 `onclick="myFunction()"` 或在 JavaScript 中使用 `addEventListener()`。
*   **实现方式**:
    *   **绑定事件**: 将事件处理函数直接赋值给 JSX 属性。
        ```pseudocode
        FUNCTION MyButton()
            FUNCTION handleClick()
                LOG "Button clicked!"
            END FUNCTION

            RETURN <button onClick={handleClick}>Click Me</button>;
        END FUNCTION
        ```
    *   **传递事件对象**: 事件处理函数会自动接收一个合成事件对象。
        ```pseudocode
        FUNCTION MyInput()
            FUNCTION handleChange(event)
                LOG event.target.value
            END FUNCTION

            RETURN <input type="text" onChange={handleChange} />;
        END FUNCTION
        ```
    *   **`this` 绑定 (类组件)**: 在类组件中，事件处理函数需要绑定 `this`。
        ```pseudocode
        CLASS MyClassComponent EXTENDS React.Component
            CONSTRUCTOR(props)
                SUPER(props);
                THIS.handleClick = THIS.handleClick.bind(THIS); // 绑定 this
            END CONSTRUCTOR

            METHOD handleClick()
                LOG "Button clicked!"
            END METHOD

            METHOD render()
                RETURN <button onClick={THIS.handleClick}>Click Me</button>;
            END METHOD
        END CLASS
        ```

## 6. 生命周期 (Lifecycle)

*   **React 概念**: 组件在挂载、更新和卸载过程中会经历一系列阶段，React 提供了特定的生命周期方法（类组件）或 Hook（函数组件）来在这些阶段执行代码。
*   **HTML/CSS/JS 对应概念**: 类似于 DOMContentLoaded 事件、MutationObserver 或手动管理 DOM 元素的创建、更新和销毁。
*   **实现方式**:
    *   **函数组件 (使用 Hooks)**: 使用 `useEffect` Hook。
        ```pseudocode
        IMPORT { useEffect, useState } FROM 'react';

        FUNCTION MyComponent()
            CONST [count, setCount] = useState(0);

            // 相当于 componentDidMount 和 componentDidUpdate
            useEffect(() => {
                LOG "Component mounted or updated";
                RETURN () => {
                    LOG "Component will unmount (cleanup)"; // 相当于 componentWillUnmount
                };
            }, [count]); // 依赖数组，只有当 count 改变时才重新运行 effect

            RETURN <div>...</div>;
        END FUNCTION
        ```
    *   **类组件**:
        *   **挂载阶段**: `constructor()`, `static getDerivedStateFromProps()`, `render()`, `componentDidMount()`
        *   **更新阶段**: `static getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()`, `componentDidUpdate()`
        *   **卸载阶段**: `componentWillUnmount()`
        ```pseudocode
        CLASS MyClassComponent EXTENDS React.Component
            METHOD componentDidMount()
                LOG "Component mounted"; // 组件挂载后执行
            END METHOD

            METHOD componentDidUpdate(prevProps, prevState)
                LOG "Component updated"; // 组件更新后执行
            END METHOD

            METHOD componentWillUnmount()
                LOG "Component will unmount"; // 组件卸载前执行
            END METHOD

            METHOD render()
                RETURN <div>...</div>;
            END METHOD
        END CLASS
        ```

## 7. 条件渲染 (Conditional Rendering)

*   **React 概念**: 根据条件决定是否渲染组件或元素。
*   **HTML/CSS/JS 对应概念**: 类似于 JavaScript 中的 `if/else` 语句来动态添加/移除 DOM 元素，或使用 CSS `display: none`。
*   **实现方式**:
    *   **`if` 语句**:
        ```pseudocode
        FUNCTION Greeting(props)
            IF props.isLoggedIn THEN
                RETURN <UserGreeting />;
            ELSE
                RETURN <GuestGreeting />;
            END IF
        END FUNCTION
        ```
    *   **逻辑 `&&` 运算符**:
        ```pseudocode
        FUNCTION Mailbox(props)
            CONST unreadMessages = props.unreadMessages;
            RETURN (
                <div>
                    <h1>Hello!</h1>
                    {unreadMessages.length > 0 &&
                        <h2>
                            You have {unreadMessages.length} unread messages.
                        </h2>
                    }
                </div>
            );
        END FUNCTION
        ```
    *   **三元运算符**:
        ```pseudocode
        FUNCTION LoginButton(props)
            RETURN (
                props.isLoggedIn ? (
                    <button>Logout</button>
                ) : (
                    <button>Login</button>
                )
            );
        END FUNCTION
        ```

## 8. 列表渲染 (List Rendering)

*   **React 概念**: 渲染一个元素集合，通常使用 JavaScript 的 `map()` 方法。每个列表项需要一个唯一的 `key` prop。
*   **HTML/CSS/JS 对应概念**: 类似于在 JavaScript 中使用循环（`for` 循环、`forEach`）来动态生成 HTML 字符串或 DOM 元素。
*   **实现方式**:
    ```pseudocode
    FUNCTION NumberList(props)
        CONST numbers = props.numbers;
        CONST listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        RETURN <ul>{listItems}</ul>;
    END FUNCTION

    // 使用示例
    // <NumberList numbers={[1, 2, 3, 4, 5]} />
    ```
    *   **`key` 的重要性**: `key` 帮助 React 识别哪些项已更改、添加或删除，从而优化渲染性能。

## 9. 表单 (Forms)

*   **React 概念**: React 中的表单元素通常是“受控组件”，即表单数据由 React 状态管理。
*   **HTML/CSS/JS 对应概念**: 传统的 HTML 表单元素，通过 `value` 属性和 `onchange` 事件来获取和设置输入值。
*   **实现方式**:
    *   **受控组件**:
        ```pseudocode
        IMPORT { useState } FROM 'react';

        FUNCTION NameForm()
            CONST [name, setName] = useState('');

            FUNCTION handleChange(event)
                setName(event.target.value);
            END FUNCTION

            FUNCTION handleSubmit(event)
                ALERT 'A name was submitted: ' + name;
                event.preventDefault(); // 阻止表单默认提交行为
            END FUNCTION

            RETURN (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            );
        END FUNCTION
        ```
    *   **非受控组件**: 使用 `useRef` 直接访问 DOM 元素（不推荐作为主要方式）。

## 10. Hook (React Hooks)

*   **React 概念**: 函数组件中“钩入” React 特性（如状态、生命周期等）的函数。它们允许在不编写类的情况下使用状态和其他 React 特性。
*   **HTML/CSS/JS 对应概念**: 没有直接的对应概念，Hooks 是 React 特有的抽象，旨在简化函数组件中的状态逻辑复用。
*   **实现方式**:
    *   **`useState`**: 用于在函数组件中添加状态。
    *   **`useEffect`**: 用于在函数组件中执行副作用（数据获取、订阅或手动更改 DOM）。
    *   **`useContext`**: 用于订阅 React Context。
    *   **`useRef`**: 用于访问 DOM 节点或在渲染之间持久化可变值。
    *   **`useCallback` / `useMemo`**: 用于性能优化。
    *   **自定义 Hook**: 封装可重用的状态逻辑。
        ```pseudocode
        // Custom Hook 示例
        IMPORT { useState, useEffect } FROM 'react';

        FUNCTION useFriendStatus(friendId)
            CONST [isOnline, setIsOnline] = useState(null);

            useEffect(() => {
                // 模拟 API 调用
                FUNCTION handleStatusChange(status)
                    setIsOnline(status.isOnline);
                END FUNCTION
                // ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
                RETURN () => {
                    // ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
                };
            }, [friendId]);

            RETURN isOnline;
        END FUNCTION
        ```

## 11. Context (上下文)

*   **React 概念**: 提供一种在组件树中共享数据的方式，而无需通过 props 逐层手动传递。适用于全局数据（如主题、用户认证信息）。
*   **HTML/CSS/JS 对应概念**: 类似于全局 JavaScript 变量，但 Context 提供了更受控和响应式的数据共享机制。
*   **实现方式**:
    *   **创建 Context**: `React.createContext()`。
        ```pseudocode
        CONST ThemeContext = React.createContext('light');
        ```
    *   **提供 Context**: `Context.Provider` 组件。
        ```pseudocode
        FUNCTION App()
            RETURN (
                <ThemeContext.Provider value="dark">
                    <Toolbar />
                </ThemeContext.Provider>
            );
        END FUNCTION
        ```
    *   **消费 Context**: `Context.Consumer` 组件或 `useContext` Hook。
        ```pseudocode
        // 使用 useContext Hook
        IMPORT { useContext } FROM 'react';
        IMPORT ThemeContext FROM './ThemeContext';

        FUNCTION ThemedButton()
            CONST theme = useContext(ThemeContext);
            RETURN <button className={theme}>I am themed</button>;
        END FUNCTION
        ```

## 12. 路由 (Routing)

*   **React 概念**: 在单页应用 (SPA) 中管理不同 URL 路径对应的 UI 渲染。通常使用第三方库如 React Router。
*   **HTML/CSS/JS 对应概念**: 传统的页面跳转（`<a href="...">`），或使用 `window.location` 和 `history.pushState()` 手动管理浏览器历史。
*   **实现方式 (以 React Router 为例)**:
    ```pseudocode
    IMPORT { BrowserRouter as Router, Route, Link, Switch } FROM 'react-router-dom';

    FUNCTION App()
        RETURN (
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    END FUNCTION
    ```

## 13. 性能优化 (Performance Optimization)

*   **React 概念**: 通过减少不必要的组件重新渲染来提高应用性能。
*   **HTML/CSS/JS 对应概念**: 类似于手动优化 DOM 操作，减少重绘和回流。
*   **实现方式**:
    *   **`React.memo` (函数组件)**: 记忆化组件，只有当 props 改变时才重新渲染。
        ```pseudocode
        CONST MyMemoizedComponent = React.memo(FUNCTION MyComponent(props) {
            // ...
        });
        ```
    *   **`shouldComponentUpdate` (类组件)**: 手动控制组件是否重新渲染。
    *   **`useCallback` / `useMemo` (Hooks)**: 记忆化函数和计算结果，避免不必要的重新创建或重新计算。
        ```pseudocode
        CONST memoizedCallback = useCallback(
            () => {
                doSomething(a, b);
            },
            [a, b], // 依赖数组
        );

        CONST memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
        ```
    *   **列表 `key`**: 确保列表渲染时提供稳定的 `key`。
    *   **懒加载 (Lazy Loading) / 代码分割 (Code Splitting)**: 使用 `React.lazy` 和 `Suspense` 按需加载组件。
        ```pseudocode
        CONST OtherComponent = React.lazy(() => IMPORT('./OtherComponent'));

        FUNCTION MyComponent()
            RETURN (
                <Suspense fallback={<div>Loading...</div>}>
                    <OtherComponent />
                </Suspense>
            );
        END FUNCTION
        ```

## 14. 错误边界 (Error Boundaries)

*   **React 概念**: 一种 React 组件，可以捕获其子组件树中 JavaScript 错误，记录错误，并显示备用 UI，而不是使整个组件树崩溃。
*   **HTML/CSS/JS 对应概念**: 类似于 JavaScript 中的 `try...catch` 块，但专门用于 UI 组件树中的错误。
*   **实现方式**:
    *   **类组件**: 实现 `static getDerivedStateFromError()` 或 `componentDidCatch()` 生命周期方法。
        ```pseudocode
        CLASS ErrorBoundary EXTENDS React.Component
            CONSTRUCTOR(props)
                SUPER(props);
                THIS.state = { hasError: false };
            END CONSTRUCTOR

            STATIC METHOD getDerivedStateFromError(error)
                // 更新 state 使下一次渲染能够显示降级 UI
                RETURN { hasError: true };
            END METHOD

            METHOD componentDidCatch(error, errorInfo)
                // 你也可以将错误日志上报给服务器
                LOG error, errorInfo;
            END METHOD

            METHOD render()
                IF THIS.state.hasError THEN
                    // 你可以渲染任何自定义的降级 UI
                    RETURN <h1>Something went wrong.</h1>;
                END IF
                RETURN THIS.props.children;
            END METHOD
        END CLASS

        // 使用示例
        // <ErrorBoundary>
        //   <MyProblematicComponent />
        // </ErrorBoundary>