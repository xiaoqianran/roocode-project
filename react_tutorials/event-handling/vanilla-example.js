// vanilla-example.js
// 纯 JavaScript 事件处理示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 基本点击事件
function createVanillaClickCounter() {
    let count = 0;

    const div = document.createElement('div');
    div.className = 'event-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 点击事件';
    div.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = `You clicked ${count} times.`;
    div.appendChild(p);

    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.addEventListener('click', () => {
        count++;
        p.textContent = `You clicked ${count} times.`;
        console.log('Button clicked! Count:', count);
    });
    div.appendChild(button);

    return div;
}

// 2. 输入框 Change 事件
function createVanillaInputLogger() {
    const div = document.createElement('div');
    div.className = 'event-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 输入事件';
    div.appendChild(h3);

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

    return div;
}

// 3. 阻止默认行为 (表单提交)
function createVanillaSubmitForm() {
    const div = document.createElement('div');
    div.className = 'event-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 表单提交事件';
    div.appendChild(h3);

    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter something';
    form.appendChild(input);

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Submit';
    form.appendChild(button);

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // 阻止表单默认提交行为
        alert('Form submitted! (Default behavior prevented)');
        console.log('Form submitted!');
    });
    div.appendChild(form);

    return div;
}

// 4. 事件参数传递
function createVanillaParameterButton() {
    const div = document.createElement('div');
    div.className = 'event-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 事件参数';
    div.appendChild(h3);

    const button = document.createElement('button');
    button.textContent = 'Show Message';
    const message = 'Hello from Vanilla JS!';
    button.addEventListener('click', () => {
        alert(message);
        console.log(message);
    });
    div.appendChild(button);

    return div;
}


// 渲染到 DOM
vanillaRoot.appendChild(createVanillaClickCounter());
vanillaRoot.appendChild(createVanillaInputLogger());
vanillaRoot.appendChild(createVanillaSubmitForm());
vanillaRoot.appendChild(createVanillaParameterButton());