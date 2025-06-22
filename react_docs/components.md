# 组件 (Components)

在 React 中，组件是构建用户界面的基本单元。它们是独立的、可重用的代码块，封装了 UI 的一部分及其行为。组件使得 UI 开发更加模块化和高效。

## 为什么使用组件？

组件的核心思想是“关注点分离”和“可重用性”。通过将 UI 拆分成独立的组件，你可以：

*   **提高可维护性**: 每个组件只负责渲染和管理自身的数据，使得代码更容易理解和修改。
*   **增强可重用性**: 一旦组件被定义，就可以在应用的不同部分甚至不同的项目中多次使用。
*   **简化复杂 UI**: 将复杂的 UI 拆分成小的、可管理的组件，降低了整体的复杂性。

## 组件与传统 HTML/CSS/JS 的对比

在传统的 Web 开发中，你可能会使用可重用的 HTML 模板、Web Components 或 JavaScript 中的模块化 UI 片段（例如，一个函数返回一个 DOM 元素）来实现类似组件的功能。然而，React 组件提供了更强大的数据管理和响应式更新机制。

### 传统 JavaScript 示例

在纯 JavaScript 中，你可能会编写一个函数来创建和返回一个 DOM 元素，以实现某种程度的模块化。

请参考 [`examples/jsx/vanilla-example.js`](examples/jsx/vanilla-example.js:46-52) 中的示例：

```javascript
// examples/jsx/vanilla-example.js
function createGreeting(framework) {
    const p = document.createElement('p');
    p.textContent = `Greetings from ${framework}!`;
    return p;
}

vanillaRoot.appendChild(createGreeting("Vanilla JS"));
```

### React 组件示例

在 React 中，组件是一个 JavaScript 函数或类，它接收数据（称为 `props`）并返回描述 UI 的 JSX。

请参考 [`examples/jsx/react-example.js`](examples/jsx/react-example.js:31-47) 中的示例：

```jsx
// examples/jsx/react-example.js
// 5. 函数组件返回 JSX
function Greeting(props) {
    return <p>Greetings from {props.framework}!</p>;
}

// 组合所有 JSX 元素
function App() {
    return (
        <div className="jsx-container">
            <h2>React JSX 示例</h2>
            {/* ... 其他 JSX 元素 */}
            <Greeting framework="React" />
        </div>
    );
}
```

## React 组件的实现方式

React 组件主要有两种类型：函数组件和类组件。在现代 React 开发中，函数组件和 Hooks 是首选。

### 1. 函数组件

函数组件是简单的 JavaScript 函数，它们接收一个 `props` 对象作为参数，并返回 JSX。

```jsx
// 一个简单的函数组件
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

### 2. 类组件

类组件是 ES6 类，它们继承自 `React.Component`，并且必须包含一个 `render()` 方法，该方法返回 JSX。

```jsx
// 一个简单的类组件
class WelcomeClass extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

### 3. 组件的渲染

要将 React 组件渲染到 DOM 中，你需要使用 `ReactDOM.createRoot()` 和 `root.render()`。

```javascript
// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);
```

### 4. 模块化

在实际项目中，每个组件通常在一个单独的文件中定义并导出，以便于组织和管理。

```javascript
// file: components/Button.js
import React from 'react';

function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;
```

## 总结

组件是 React 的基石，它们提供了一种强大而灵活的方式来构建可维护、可重用的用户界面。通过将 UI 拆分为独立的组件，React 极大地简化了复杂应用的开发和管理。