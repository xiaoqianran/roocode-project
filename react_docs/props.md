# Props (Properties)

在 React 中，**Props (Properties)** 是从父组件传递给子组件的数据。它们是组件之间通信的主要方式。Props 是只读的，这意味着子组件不能修改它们接收到的 props。这种“单向数据流”是 React 的核心原则之一，它使得数据流向清晰可预测。

## 为什么使用 Props？

Props 允许你构建可配置和可重用的组件。通过传递不同的 props，你可以让同一个组件在不同的场景下显示不同的内容或行为。

## Props 与传统 HTML/CSS/JS 的对比

在传统 Web 开发中，Props 的概念类似于 HTML 元素的属性（attributes），或者 JavaScript 函数的参数。

### 传统 JavaScript 示例

在纯 JavaScript 中，你通常会通过函数参数来传递数据，或者直接设置 DOM 元素的属性。

请参考 [`examples/props/vanilla-example.js`](examples/props/vanilla-example.js:7-34) 中的示例：

```javascript
// examples/props/vanilla-example.js
function createVanillaUserCard(userData, childrenContent = '') {
    const div = document.createElement('div');
    // ...
    const pName = document.createElement('p');
    pName.textContent = `Name: ${userData.name}`; // 通过参数接收数据
    div.appendChild(pName);
    // ...
    if (childrenContent) {
        const pChildren = document.createElement('p');
        pChildren.innerHTML = childrenContent;
        div.appendChild(pChildren);
    }
    return div;
}

// 调用函数并传递参数
const vanillaUserData1 = {
    name: "Alice",
    age: 30,
    occupation: "Software Engineer"
};
vanillaRoot.appendChild(createVanillaUserCard(vanillaUserData1, 'This is a child element passed as <code>children</code> parameter.'));
```

### React Props 示例

在 React 中，你将数据作为属性直接传递给 JSX 元素，子组件通过 `props` 对象来访问这些数据。

请参考 [`examples/props/react-example.js`](examples/props/react-example.js:5-14) 和 [`examples/props/react-example.js`](examples/props/react-example.js:38-40) 中的示例：

```jsx
// examples/props/react-example.js
// 1. 接收并显示 Props 的函数组件
function UserCard(props) {
    return (
        <div className="props-card">
            <p>Name: {props.name}</p> {/* 通过 props.name 访问 */}
            <p>Age: {props.age}</p>
            <p>Occupation: {props.occupation}</p>
            {props.children} {/* 渲染 children prop */}
        </div>
    );
}

// 3. 父组件向子组件传递 Props
function App() {
    const userData = {
        name: "Alice",
        age: 30,
        occupation: "Software Engineer"
    };

    return (
        <div>
            <UserCard name={userData.name} age={userData.age} occupation={userData.occupation}>
                <p>This is a child element passed as <code>children</code> prop.</p>
            </UserCard>
        </div>
    );
}
```

## React Props 的实现方式

### 1. 传递 Props

在父组件中，你可以像传递 HTML 属性一样，将数据作为属性传递给子组件。

```jsx
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const message = "Hello from Parent!";
    return <ChildComponent text={message} data={{ value: 123 }} />;
}
```

### 2. 接收 Props

在子组件中，你可以通过 `props` 参数（函数组件）或 `this.props`（类组件）来接收这些数据。

**函数组件:**

```jsx
// ChildComponent.js
function ChildComponent(props) {
    return <p>{props.text} - {props.data.value}</p>;
}
```

**类组件:**

```jsx
class ChildClassComponent extends React.Component {
    render() {
        return <p>{this.props.text} - {this.props.data.value}</p>;
    }
}
```

### 3. `children` Prop

`props.children` 是一个特殊的 prop，它包含了组件标签之间传递的所有内容。这使得你可以将 JSX 嵌套在组件内部。

```jsx
function Card(props) {
    return (
        <div className="card">
            {props.children} {/* 这里会渲染 Card 标签内的所有内容 */}
        </div>
    );
}

// 使用 Card 组件
<Card>
    <h2>Card Title</h2>
    <p>Some content inside the card.</p>
</Card>
```

### 4. 默认 Props

你可以为 props 定义默认值，当父组件没有传递某个 prop 时，子组件将使用这些默认值。

```jsx
function Greet(props) {
    return <p>Hello, {props.name}</p>;
}

// 为 name prop 设置默认值
Greet.defaultProps = {
    name: "Guest"
};

// 使用示例
<Greet /> // 输出: Hello, Guest
<Greet name="Alice" /> // 输出: Hello, Alice
```

## 总结

Props 是 React 中实现组件间数据流的关键机制。它们提供了一种单向、只读的数据传递方式，确保了数据流的清晰和可预测性。通过有效地使用 props，你可以构建高度可配置和可重用的 React 组件。