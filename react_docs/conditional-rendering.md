# 条件渲染 (Conditional Rendering)

在 React 中，**条件渲染**是指根据不同的条件决定是否渲染组件或元素。这使得你可以动态地显示或隐藏 UI 的不同部分，以响应应用的状态或用户交互。

## 为什么使用条件渲染？

条件渲染是构建动态和响应式用户界面的基本能力。它允许你：

*   根据用户是否登录显示不同的导航栏。
*   根据数据是否加载完成显示加载指示器或实际内容。
*   根据权限显示或隐藏某些功能。
*   在表单验证失败时显示错误消息。

## 条件渲染与传统 HTML/CSS/JS 的对比

在传统 JavaScript 中，你通常会使用 `if/else` 语句来动态添加/移除 DOM 元素，或者使用 CSS 的 `display: none` 属性来隐藏元素。

### 传统 JavaScript 示例

在纯 JavaScript 中，你需要手动编写逻辑来根据条件操作 DOM 元素的可见性或存在性。

请参考 [`examples/state/vanilla-example.js`](examples/state/vanilla-example.js:58-65) 中的消息切换示例：

```javascript
// examples/state/vanilla-example.js
toggleButton.onclick = () => {
    isVisible = !isVisible; // 更新状态
    if (isVisible) {
        p.textContent = 'This message is visible!';
        toggleButton.textContent = 'Hide Message';
    } else {
        p.textContent = 'Message is hidden.';
        toggleButton.textContent = 'Show Message';
    }
};
```

### React 条件渲染示例

在 React 中，你可以直接在 JSX 中使用 JavaScript 的条件运算符来控制渲染。

请参考 [`examples/state/react-example.js`](examples/state/react-example.js:48-51) 中的消息切换示例：

```jsx
// examples/state/react-example.js
class ToggleMessage extends React.Component {
    // ...
    render() {
        return (
            <div className="state-card">
                {this.state.isVisible ? <p>This message is visible!</p> : <p>Message is hidden.</p>}
                <button onClick={this.toggleVisibility}>
                    {this.state.isVisible ? 'Hide Message' : 'Show Message'}
                </button>
            </div>
        );
    }
}
```

## React 条件渲染的实现方式

在 React 中，你可以使用标准的 JavaScript 控制流语句（如 `if` 语句）或逻辑运算符（如 `&&` 和 `? :`）来条件性地渲染组件或元素。

### 1. `if` 语句

你可以在组件的 `render` 方法（类组件）或函数组件的返回语句之前使用 `if` 语句来条件性地返回不同的 JSX。

```jsx
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function UserGreeting() {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
    return <h1>Please sign up.</h1>;
}
```

### 2. 逻辑 `&&` 运算符 (短路求值)

当你想在条件为 `true` 时渲染一个元素，而在条件为 `false` 时不渲染任何内容时，可以使用逻辑 `&&` 运算符。在 JavaScript 中，`true && expression` 的结果是 `expression`，而 `false && expression` 的结果是 `false`。在 JSX 中，`false`、`null`、`undefined` 和 `true` 都是有效的渲染结果，它们不会在 DOM 中渲染任何内容。

```jsx
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

// 使用示例
// <Mailbox unreadMessages={['Message 1', 'Message 2']} /> // 显示消息数量
// <Mailbox unreadMessages={[]} /> // 不显示消息数量
```

### 3. 三元运算符 (条件运算符)

三元运算符 `condition ? trueExpression : falseExpression` 允许你在条件为 `true` 和 `false` 时渲染不同的内容。

```jsx
function LoginButton(props) {
    const isLoggedIn = props.isLoggedIn;
    return (
        isLoggedIn ? (
            <button>Logout</button>
        ) : (
            <button>Login</button>
        )
    );
}

// 使用示例
// <LoginButton isLoggedIn={true} /> // 渲染 Logout 按钮
// <LoginButton isLoggedIn={false} /> // 渲染 Login 按钮
```

### 4. 元素变量

你可以使用变量来存储条件性渲染的元素，然后在 JSX 中引用该变量。

```jsx
function RenderControl(props) {
    let componentToRender;

    if (props.type === 'button') {
        componentToRender = <button>Click Me</button>;
    } else if (props.type === 'input') {
        componentToRender = <input type="text" />;
    } else {
        componentToRender = <p>No component selected.</p>;
    }

    return (
        <div>
            {componentToRender}
        </div>
    );
}
```

## 总结

条件渲染是 React 中一个强大且常用的特性，它允许你根据应用的状态和逻辑动态地控制 UI 的显示。通过结合 JavaScript 的条件语句和运算符，你可以构建出高度灵活和响应式的用户界面。