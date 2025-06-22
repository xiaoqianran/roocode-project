// react-example.js
// React 表单示例

import { useState, useRef } from 'react';

// 1. 受控组件 (文本输入)
function NameForm() {
    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + name);
        console.log('Submitted Name:', name);
    };

    return (
        <div className="form-card">
            <h3>React 受控组件 (文本)</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>Current Name: {name}</p>
        </div>
    );
}

// 2. 受控组件 (Select 下拉框)
function FlavorForm() {
    const [flavor, setFlavor] = useState('coconut');

    const handleChange = (event) => {
        setFlavor(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Your favorite flavor is: ' + flavor);
        console.log('Submitted Flavor:', flavor);
    };

    return (
        <div className="form-card">
            <h3>React 受控组件 (Select)</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select value={flavor} onChange={handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>Current Flavor: {flavor}</p>
        </div>
    );
}

// 3. 受控组件 (多行文本 textarea)
function EssayForm() {
    const [essay, setEssay] = useState('Please write an essay about your favorite DOM element.');

    const handleChange = (event) => {
        setEssay(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('An essay was submitted: ' + essay);
        console.log('Submitted Essay:', essay);
    };

    return (
        <div className="form-card">
            <h3>React 受控组件 (Textarea)</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Essay:
                    <textarea value={essay} onChange={handleChange} rows="5" cols="30" />
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>Current Essay: {essay}</p>
        </div>
    );
}

// 4. 非受控组件 (使用 useRef) - 不推荐作为主要方式
function FileInputForm() {
    const fileInput = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(
            `Selected file - ${fileInput.current.files[0].name}`
        );
        console.log('Selected File:', fileInput.current.files[0].name);
    };

    return (
        <div className="form-card">
            <h3>React 非受控组件 (FileInput with useRef)</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={fileInput} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


// 组合组件
function App() {
    return (
        <div>
            <h2>React 表单示例</h2>
            <NameForm />
            <hr />
            <FlavorForm />
            <hr />
            <EssayForm />
            <hr />
            <FileInputForm />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);