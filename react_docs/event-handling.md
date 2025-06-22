# 事件处理 (Event Handling)

在 React 中，事件处理是构建交互式用户界面的关键部分。React 的事件系统与原生 DOM 事件系统非常相似，但有一些重要的区别，旨在提供更好的跨浏览器兼容性和性能。

## 为什么使用 React 事件处理？

React 的事件处理系统（称为“合成事件”）提供了一个统一的接口，消除了不同浏览器之间事件行为的差异。它还通过事件委托机制自动优化了性能，将事件监听器附加到文档根部，而不是每个单独的 DOM 元素。

## 事件处理与传统 HTML/CSS/JS 的对比

在传统 HTML/JavaScript 中，你通常会在 HTML 标签中使用 `on` 前缀的属性（例如 `onclick="myFunction()"`）来绑定事件，或者在 JavaScript 中使用 `addEventListener()` 方法。

### 传统 JavaScript 示例

在纯 JavaScript 中，你通常会使用 `addEventListener` 来绑定事件监听器。

请参考 [`examples/event-handling/vanilla-example.js`](examples/event-handling/vanilla-example.js:23-27) 中的点击事件示例：

```javascript
// examples/event-handling/vanilla-example.js
const button = document.createElement('button');
button.textContent = 'Click Me';
button.addEventListener('click', () => {
    count++;
    p.textContent = `You clicked ${count} times.`;
    console.log('Button clicked! Count:', count);
});
```

### React 事件处理示例

在 React 中，事件处理函数直接作为 JSX 属性传递，并且使用驼峰命名法。

请参考 [`examples/event-handling/react-example.js`](examples/event-handling/react-example.js:11-19) 中的点击事件示例：

```jsx
// examples/event-handling/react-example.js
function ClickCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        console.log('Button clicked! Count:', count + 1);
    };

    return (
        <div className="event-card">
            <button onClick={handleClick}>Click Me</button> {/* 注意 onClick 是驼峰命名 */}
        </div>
    );
}
```

## React 事件处理的实现方式

### 1. 绑定事件

在 React 中，你将事件处理函数直接赋值给 JSX 属性。这些属性使用驼峰命名法（例如 `onClick`、`onChange`、`onSubmit`）。

```jsx
function MyButton() {
    function handleClick() {
        console.log("Button clicked!");
    }

    return <button onClick={handleClick}>Click Me</button>;
}
```

### 2. 传递事件对象

事件处理函数会自动接收一个合成事件对象 (SyntheticEvent)。这个对象是 React 对浏览器原生事件的封装，它提供了与原生事件相同的接口，但具有更好的跨浏览器兼容性。

```jsx
function MyInput() {
    function handleChange(event) {
        // event 是合成事件对象
        console.log("Input value:", event.target.value);
    }

    return <input type="text" onChange={handleChange} />;
}
```

### 3. 阻止默认行为

你可以使用合成事件对象的 `preventDefault()` 方法来阻止事件的默认行为，例如阻止表单提交或链接跳转。

```jsx
function SubmitForm() {
    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单默认提交行为
        alert('Form submitted! (Default behavior prevented)');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

### 4. 事件参数传递

如果你需要向事件处理函数传递额外的参数，可以使用箭头函数或 `Function.prototype.bind`。

**使用箭头函数 (推荐):**

```jsx
function ItemList() {
    const items = ['Apple', 'Banana', 'Cherry'];

    const handleDelete = (item) => {
        console.log(`Deleting ${item}`);
        // 执行删除逻辑
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item}>
                    {item}
                    <button onClick={() => handleDelete(item)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}
```

**使用 `Function.prototype.bind` (类组件中常见):**

```jsx
class MyClassComponent extends React.Component {
    handleClick(message, event) {
        console.log(message, event);
    }

    render() {
        // 将 message 作为第一个参数传递给 handleClick
        return <button onClick={this.handleClick.bind(this, 'Hello')}>Click Me</button>;
    }
}
```

### 5. `this` 绑定 (类组件)

在类组件中，如果你将方法作为事件处理函数传递，你需要确保 `this` 的上下文是正确的。最常见的方法是在构造函数中绑定 `this`，或者使用箭头函数定义类方法。

**在构造函数中绑定 `this`:**

```jsx
class MyClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); // 绑定 this
    }

    handleClick() {
        console.log("Button clicked!", this); // this 将指向组件实例
    }

    render() {
        return <button onClick={this.handleClick}>Click Me</button>;
    }
}
```

**使用箭头函数定义类方法 (推荐):**

```jsx
class MyClassComponent extends React.Component {
    // 箭头函数会自动绑定 this
    handleClick = () => {
        console.log("Button clicked!", this); // this 将指向组件实例
    };

    render() {
        return <button onClick={this.handleClick}>Click Me</button>;
    }
}
```

## 总结

React 的事件处理系统提供了一种高效、跨浏览器兼容且易于使用的方式来响应用户交互。通过合成事件和声明式绑定，你可以轻松地为你的 React 应用添加丰富的交互功能。