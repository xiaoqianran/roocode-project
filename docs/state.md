# 状态 (State)

在 React 中，**状态 (State)** 是组件内部管理的数据，用于存储组件的私有数据。当组件的状态发生改变时，React 会自动重新渲染组件，以反映最新的数据。这是 React 响应式更新机制的核心。

## 为什么使用状态？

状态允许组件拥有动态行为和交互性。例如，一个计数器组件需要存储当前的计数值，一个开关组件需要存储其开启或关闭的状态。当这些数据改变时，UI 应该随之更新。

## 状态与传统 HTML/CSS/JS 的对比

在传统 JavaScript 中，你通常会使用普通的 JavaScript 变量来存储数据。当这些数据改变时，你需要手动操作 DOM 来更新 UI。这在复杂的应用中会变得非常繁琐和容易出错。

### 传统 JavaScript 示例

在纯 JavaScript 中，你需要手动管理数据和 DOM 之间的同步。当数据改变时，你必须编写代码来查找相应的 DOM 元素并更新其内容或属性。

请参考 [`examples/state/vanilla-example.js`](examples/state/vanilla-example.js:7-35) 中的计数器示例：

```javascript
// examples/state/vanilla-example.js
function createVanillaCounter() {
    let count = 0; // 内部状态

    // ... 创建 DOM 元素

    const p = document.createElement('p');
    p.textContent = `Count: ${count}`;
    // ... 添加到 DOM

    const incrementButton = document.createElement('button');
    incrementButton.textContent = 'Increment';
    incrementButton.onclick = () => {
        count++; // 更新状态
        p.textContent = `Count: ${count}`; // 手动更新 DOM
    };
    // ... 添加到 DOM
}
```

### React 状态示例

React 的状态管理机制是响应式的。你只需要更新组件的状态，React 就会自动处理 UI 的重新渲染。

请参考 [`examples/state/react-example.js`](examples/state/react-example.js:7-26) 中的计数器示例：

```jsx
// examples/state/react-example.js
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0); // 初始化状态

    const increment = () => {
        setCount(count + 1); // 更新状态，React 会自动重新渲染
    };

    return (
        <div className="state-card">
            <h3>React 函数组件状态</h3>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}
```

## React 状态的实现方式

React 提供了两种主要方式来管理组件状态：在函数组件中使用 `useState` Hook，以及在类组件中使用 `this.state` 和 `this.setState()`。

### 1. 函数组件中的状态 (使用 `useState` Hook)

`useState` 是一个 Hook，它允许你在函数组件中添加 React 状态。它返回一个数组，其中第一个元素是当前状态值，第二个元素是更新该状态的函数。

```jsx
import { useState } from 'react';

function Counter() {
    // 声明一个名为 'count' 的状态变量，并将其初始值设为 0
    // setCount 是一个函数，用于更新 count
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1); // 使用 setCount 更新状态
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}
```

### 2. 类组件中的状态 (使用 `this.state` 和 `this.setState()`)

在类组件中，状态存储在 `this.state` 对象中，并且必须在构造函数中初始化。要更新状态，你必须使用 `this.setState()` 方法。

```jsx
class ToggleMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true // 初始化状态
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        // 使用 this.setState 更新状态
        // 推荐使用函数式更新，以避免异步更新问题
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }));
    }

    render() {
        return (
            <div>
                {this.state.isVisible ? <p>This message is visible!</p> : <p>Message is hidden.</p>}
                <button onClick={this.toggleVisibility}>
                    {this.state.isVisible ? 'Hide Message' : 'Show Message'}
                </button>
            </div>
        );
    }
}
```

### 3. 状态的不可变性

在 React 中，状态应该是不可变的。这意味着你不应该直接修改状态对象或数组，而是应该创建新的对象或数组来更新状态。

**错误示例 (直接修改状态):**

```javascript
// 错误！不要直接修改 this.state 或状态变量
this.state.count = this.state.count + 1;
```

**正确示例 (使用更新函数):**

```javascript
// 函数组件
setCount(prevCount => prevCount + 1);

// 类组件
this.setState(prevState => ({
    count: prevState.count + 1
}));
```

## 总结

状态是 React 组件实现动态和交互式行为的关键。通过 `useState` Hook（函数组件）或 `this.state`/`this.setState()`（类组件），React 提供了一种高效且声明式的方式来管理组件内部数据，并自动响应数据变化以更新 UI。理解状态的不可变性对于编写健壮的 React 应用至关重要。