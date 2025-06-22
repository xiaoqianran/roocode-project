# Context (上下文)

在 React 中，**Context (上下文)** 提供了一种在组件树中共享数据的方式，而无需通过 props 逐层手动传递。它主要用于那些在应用中被认为是“全局”的数据，例如主题（theme）、用户认证信息、首选语言等。

## 为什么使用 Context？

在大型应用中，你可能会遇到“props 钻取 (prop drilling)”的问题，即你需要将数据从一个组件深层地传递到另一个组件，即使中间的组件并不需要这些数据。这会导致代码变得冗长且难以维护。

Context 旨在解决这个问题，它允许你：

*   **避免 props 钻取**: 无需手动将 props 从父组件一层一层地传递到子组件。
*   **共享全局数据**: 方便地在组件树的任何层级访问共享数据。
*   **简化组件通信**: 使得跨多个组件层级的通信更加容易。

## Context 与传统 HTML/CSS/JS 的对比

Context 的概念类似于全局 JavaScript 变量，但 Context 提供了更受控和响应式的数据共享机制。在传统 JavaScript 中，你可能会使用全局变量或事件发布/订阅模式来实现类似的功能，但 Context 提供了更结构化和 React 友好的方式。

## React Context 的实现方式

React Context API 主要由三个部分组成：`React.createContext`、`Context.Provider` 和 `Context.Consumer`（或 `useContext` Hook）。

### 1. 创建 Context

首先，你需要使用 `React.createContext()` 方法创建一个 Context 对象。这个方法返回一个带有 `Provider` 和 `Consumer` 属性的对象。

```jsx
// ThemeContext.js
import React from 'react';

// 创建一个 Context 对象，并提供一个默认值（可选）
const ThemeContext = React.createContext('light');

export default ThemeContext;
```

### 2. 提供 Context 值 (`Context.Provider`)

`Context.Provider` 组件用于在组件树中提供 Context 值。任何位于 `Provider` 下的组件，无论其嵌套深度如何，都可以访问到这个 Context 值。

```jsx
// App.js
import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import Toolbar from './Toolbar'; // 假设 Toolbar 是一个子组件

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        // 将当前主题值传递给 ThemeContext.Provider
        <ThemeContext.Provider value={theme}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

export default App;
```

### 3. 消费 Context 值 (`useContext` Hook)

在函数组件中，推荐使用 `useContext` Hook 来消费 Context 值。它接收 Context 对象作为参数，并返回该 Context 的当前值。

```jsx
// ThemedButton.js
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext'; // 导入 Context 对象

function ThemedButton() {
    const theme = useContext(ThemeContext); // 使用 useContext Hook 消费 Context 值

    return (
        <button className={`button-${theme}`}>
            I am a {theme} themed button
        </button>
    );
}

export default ThemedButton;
```

### 4. 消费 Context 值 (`Context.Consumer` 组件 - 传统方式)

在类组件中，或者在不支持 Hooks 的旧版 React 中，你可以使用 `Context.Consumer` 组件来消费 Context 值。它使用 Render Props 模式。

```jsx
// ThemedButtonClass.js
import React from 'react';
import ThemeContext from './ThemeContext';

class ThemedButtonClass extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {theme => ( // Consumer 的子元素是一个函数，接收 Context 值作为参数
                    <button className={`button-${theme}`}>
                        I am a {theme} themed button (Class Component)
                    </button>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default ThemedButtonClass;
```

## 总结

React Context 提供了一种高效且优雅的方式来在组件树中共享“全局”数据，从而避免了 props 钻取的问题。通过 `Provider` 提供值，并通过 `useContext` Hook（或 `Consumer` 组件）消费值，你可以轻松地在应用的不同部分访问和响应共享数据的变化。