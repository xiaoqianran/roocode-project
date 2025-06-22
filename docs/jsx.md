# JSX (JavaScript XML)

JSX 是一种 JavaScript 的语法扩展，它允许你在 JavaScript 代码中编写类似 HTML 的结构。它最终会被 Babel 编译成 `React.createElement()` 调用，从而创建 React 元素。

## 为什么使用 JSX？

JSX 使得 UI 的构建更加直观和声明式。它将渲染逻辑和 UI 结构紧密结合，提高了代码的可读性和可维护性。

## JSX 与传统 HTML/CSS/JS 的对比

在传统的 Web 开发中，你通常会在 HTML 文件中直接编写标签，或者在 JavaScript 中使用 `document.createElement()` 和 `appendChild()` 等 DOM API 手动创建和操作 DOM 元素。

### 传统 JavaScript 示例

在纯 JavaScript 中，创建和组织 DOM 元素通常涉及大量的 `document.createElement()` 和 `appendChild()` 调用，这会使代码变得冗长且难以阅读，尤其是在构建复杂的 UI 结构时。

请参考 [`examples/jsx/vanilla-example.js`](examples/jsx/vanilla-example.js) 中的示例：

```javascript
// examples/jsx/vanilla-example.js
const vanillaRoot = document.getElementById('vanilla-root');

// 1. 基本 DOM 元素创建
const h1 = document.createElement('h1');
h1.textContent = 'Hello, Vanilla JS!';
vanillaRoot.appendChild(h1);

// 4. 创建包含子元素的复杂结构
const div2 = document.createElement('div');
const h2 = document.createElement('h2');
h2.textContent = '纯 JavaScript 子元素';
div2.appendChild(h2);

const p2 = document.createElement('p');
p2.textContent = '这是一个段落。';
div2.appendChild(p2);

// ... 更多 DOM 操作
```

### React JSX 示例

通过 JSX，你可以用更简洁、更声明式的方式描述 UI 结构，它看起来就像普通的 HTML。

请参考 [`examples/jsx/react-example.js`](examples/jsx/react-example.js) 中的示例：

```jsx
// examples/jsx/react-example.js
// 1. 基本 JSX 元素
const element1 = <h1>Hello, JSX!</h1>;

// 4. JSX 中的子元素
const element4 = (
    <div>
        <h2>JSX 子元素</h2>
        <p>这是一个段落。</p>
        <ul>
            <li>列表项 1</li>
            <li>列表项 2</li>
        </ul>
    </div>
);
```

## JSX 的实现方式

### 1. 基本 JSX 元素

你可以直接在 JavaScript 文件中编写 HTML 标签，React 会将其识别为 UI 元素。

```jsx
const element = <h1>Hello, world!</h1>;
```

在底层，这段 JSX 会被 Babel 编译成 `React.createElement()` 调用：

```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```

### 2. 表达式嵌入

在 JSX 中，你可以使用花括号 `{}` 来嵌入任何有效的 JavaScript 表达式。这使得你可以在 UI 中动态地显示数据或执行逻辑。

```jsx
const name = "React";
const greeting = <p>Hello, {name}</p>;
```

### 3. JSX 属性

JSX 属性与 HTML 属性类似，但有一些关键区别：

*   **驼峰命名法**: 大多数 HTML 属性在 JSX 中使用驼峰命名法。例如，`class` 变为 `className`，`for` 变为 `htmlFor`。
*   **JavaScript 表达式作为属性值**: 你可以使用花括号 `{}` 将 JavaScript 表达式作为属性值。

```jsx
const divElement = <div className="container" style={{ color: 'blue' }}></div>;
```

### 4. JSX 中的子元素

JSX 标签可以包含子元素，就像 HTML 一样。

```jsx
const elementWithChildren = (
    <div>
        <h1>标题</h1>
        <p>这是一个段落。</p>
    </div>
);
```

### 5. 函数组件返回 JSX

React 组件（特别是函数组件）通常会返回 JSX 来描述它们应该渲染的 UI。

```jsx
function Greeting(props) {
    return <p>Greetings from {props.framework}!</p>;
}
```

## 总结

JSX 是 React 的核心特性之一，它通过提供一种声明式、类似 HTML 的语法来描述 UI，极大地简化了 React 应用的开发。与传统的 DOM 操作相比，JSX 使得 UI 代码更具可读性、可维护性，并与组件的逻辑紧密结合。