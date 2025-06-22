# 表单 (Forms)

在 React 中，处理表单输入的方式与传统的 HTML 表单有所不同。React 中的表单元素通常是“受控组件”，这意味着表单数据由 React 状态管理。当用户输入数据时，React 状态会更新，然后通过 `value` 属性将状态值“控制”回表单元素。

## 为什么使用受控组件？

使用受控组件有以下优点：

*   **数据流清晰**: 表单数据始终由 React 状态作为“单一数据源”管理，使得数据流向清晰可预测。
*   **易于验证**: 你可以在 `onChange` 事件处理函数中实时验证输入，并根据验证结果更新 UI。
*   **易于操作**: 你可以轻松地重置表单、预填充表单或在提交前修改数据。

## 表单与传统 HTML/CSS/JS 的对比

传统的 HTML 表单元素通过其自身的内部状态来管理输入值。你通常通过 `value` 属性来获取当前值，并通过 `onchange` 或 `oninput` 事件来监听值的变化。

### 传统 JavaScript 示例

在纯 JavaScript 中，你通常直接通过 DOM 元素的 `value` 属性来获取和设置输入值。

请参考 [`examples/event-handling/vanilla-example.js`](examples/event-handling/vanilla-example.js:42-54) 中的输入框示例：

```javascript
// examples/event-handling/vanilla-example.js
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Type something...';
div.appendChild(input);

const p = document.createElement('p');
p.textContent = 'Current input: ';
div.appendChild(p);

input.addEventListener('input', (event) => {
    p.textContent = `Current input: ${event.target.value}`;
    console.log('Input value:', event.target.value);
});
```

### React 表单示例 (受控组件)

在 React 中，表单元素的 `value` 属性由 React 状态控制，并且通过 `onChange` 事件来更新状态。

请参考 [`examples/event-handling/react-example.js`](examples/event-handling/react-example.js:25-38) 中的输入框示例：

```jsx
// examples/event-handling/react-example.js
function InputLogger() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value); // 更新状态
        console.log('Input value:', event.target.value);
    };

    return (
        <div className="event-card">
            <input type="text" value={inputValue} onChange={handleChange} placeholder="Type something..." />
            <p>Current input: {inputValue}</p>
        </div>
    );
}
```

## React 表单的实现方式

### 1. 受控组件

对于大多数表单元素（`<input>`、`<textarea>`、`<select>`），你可以将它们转换为受控组件。

*   **`value` 属性**: 将表单元素的 `value` 属性绑定到 React 状态。
*   **`onChange` 事件**: 监听 `onChange` 事件，并在事件处理函数中更新相应的 React 状态。

```jsx
import { useState } from 'react';

function NameForm() {
    const [name, setName] = useState(''); // 声明状态来存储输入值

    function handleChange(event) {
        setName(event.target.value); // 更新状态
    }

    function handleSubmit(event) {
        alert('A name was submitted: ' + name);
        event.preventDefault(); // 阻止表单默认提交行为
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleChange} /> {/* value 和 onChange 绑定到状态 */}
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
```

### 2. `textarea` 标签

在 HTML 中，`<textarea>` 的值通常放在其开始标签和结束标签之间。在 React 中，它也使用 `value` 属性。

```jsx
import { useState } from 'react';

function EssayForm() {
    const [value, setValue] = useState('Please write an essay about your favorite DOM element.');

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleSubmit(event) {
        alert('An essay was submitted: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Essay:
                <textarea value={value} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
```

### 3. `select` 标签

在 HTML 中，`<select>` 标签通过 `selected` 属性来设置选中项。在 React 中，它也使用 `value` 属性。

```jsx
import { useState } from 'react';

function FlavorForm() {
    const [value, setValue] = useState('coconut');

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleSubmit(event) {
        alert('Your favorite flavor is: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Pick your favorite flavor:
                <select value={value} onChange={handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
```

### 4. 非受控组件 (Uncontrolled Components)

虽然受控组件是推荐的方式，但你也可以使用“非受控组件”。非受控组件的表单数据由 DOM 本身管理，你可以使用 `useRef` Hook 直接访问 DOM 元素来获取其值。这通常用于简单的表单或与第三方 DOM 库集成时。

```jsx
import { useRef } from 'react';

function FileInput() {
    const fileInput = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${fileInput.current.files[0].name}`
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Upload file:
                <input type="file" ref={fileInput} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
```

## 总结

React 推荐使用受控组件来处理表单，通过将表单元素的值绑定到 React 状态并监听 `onChange` 事件来更新状态。这种模式使得表单数据流清晰、易于验证和操作，从而简化了复杂表单的开发。