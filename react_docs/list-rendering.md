# 列表渲染 (List Rendering)

在 React 中，**列表渲染**是指渲染一个元素集合，例如一个项目列表、用户列表或任何重复的 UI 模式。通常，这通过 JavaScript 的 `map()` 方法来实现，它将一个数组转换为一个 React 元素数组。

## 为什么使用列表渲染？

列表渲染是动态生成 UI 的常见需求。它允许你：

*   根据数据动态生成列表项，而无需手动编写每个列表项的 HTML。
*   处理可变长度的列表，例如从 API 获取的数据。
*   保持 UI 与数据同步，当数据更新时，列表会自动重新渲染。

## 列表渲染与传统 HTML/CSS/JS 的对比

在传统 JavaScript 中，你通常会使用循环（如 `for` 循环、`forEach`）来动态生成 HTML 字符串或 DOM 元素，然后将其插入到页面中。

### 传统 JavaScript 示例

在纯 JavaScript 中，你需要手动遍历数据，为每个数据项创建 DOM 元素，然后将它们添加到父元素中。

请参考 [`examples/jsx/vanilla-example.js`](examples/jsx/vanilla-example.js:35-43) 中的列表创建示例：

```javascript
// examples/jsx/vanilla-example.js
const ul = document.createElement('ul');
const li1 = document.createElement('li');
li1.textContent = '列表项 1';
ul.appendChild(li1);
const li2 = document.createElement('li');
li2.textContent = '列表项 2';
ul.appendChild(li2);
div2.appendChild(ul);
```

### React 列表渲染示例

在 React 中，你可以使用 JavaScript 的 `map()` 方法将数据数组转换为 JSX 元素数组，然后直接在 JSX 中渲染这个数组。

请参考 [`examples/jsx/react-example.js`](examples/jsx/react-example.js:23-26) 中的列表创建示例：

```jsx
// examples/jsx/react-example.js
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
</ul>
```

虽然上述示例是静态的，但在实际的 React 列表渲染中，我们会结合 `map` 方法来动态生成这些 `<li>` 元素。

## React 列表渲染的实现方式

### 1. 使用 `map()` 方法

最常见的列表渲染方式是使用 JavaScript 数组的 `map()` 方法。`map()` 方法会遍历数组中的每个元素，并对每个元素调用一个回调函数，然后将回调函数的返回值组成一个新的数组。

```jsx
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // 每个列表项都需要一个唯一的 key prop
        <li key={number.toString()}>
            {number}
        </li>
    );
    return <ul>{listItems}</ul>;
}

// 使用示例
// <NumberList numbers={[1, 2, 3, 4, 5]} />
```

### 2. `key` 的重要性

当渲染列表时，React 要求每个列表项都带有一个唯一的 `key` prop。`key` 帮助 React 识别哪些项已更改、添加或删除。这对于 React 优化渲染性能和保持组件状态至关重要。

*   **唯一性**: `key` 在兄弟节点之间必须是唯一的。
*   **稳定性**: `key` 应该是稳定的，不应该在重新渲染时改变。通常，你可以使用数据项的 ID 作为 `key`。
*   **避免使用索引作为 `key`**: 除非列表项是静态的且不会改变顺序、添加或删除，否则不建议使用数组索引作为 `key`。因为当列表项的顺序发生变化时，使用索引作为 `key` 会导致性能问题和潜在的 bug。

**正确使用 `key` 的示例:**

```jsx
function TodoList(props) {
    const todos = props.todos; // todos 数组，每个 todo 对象有 id 和 text
    return (
        <ul>
            {todos.map((todo) =>
                <li key={todo.id}> {/* 使用 todo.id 作为 key */}
                    {todo.text}
                </li>
            )}
        </ul>
    );
}

// 示例数据
// const myTodos = [
//   { id: 1, text: 'Learn React' },
//   { id: 2, text: 'Build a project' },
//   { id: 3, text: 'Deploy to production' },
// ];
// <TodoList todos={myTodos} />
```

### 3. 在组件中渲染列表

你可以在任何 React 组件中执行列表渲染，将 `map()` 方法的结果直接嵌入到 JSX 中。

```jsx
function App() {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

## 总结

列表渲染是 React 中处理动态数据集合并将其转换为 UI 的基本模式。通过结合 JavaScript 的 `map()` 方法和为每个列表项提供唯一的 `key` prop，你可以高效且正确地渲染列表，同时确保 React 能够优化性能和管理组件状态。