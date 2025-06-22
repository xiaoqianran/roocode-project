// vanilla-example.js
// 纯 JavaScript 状态示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 纯 JavaScript 计数器
function createVanillaCounter() {
    let count = 0; // 内部状态

    const div = document.createElement('div');
    div.className = 'state-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 计数器';
    div.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = `Count: ${count}`;
    div.appendChild(p);

    const incrementButton = document.createElement('button');
    incrementButton.textContent = 'Increment';
    incrementButton.onclick = () => {
        count++; // 更新状态
        p.textContent = `Count: ${count}`; // 手动更新 DOM
    };
    div.appendChild(incrementButton);

    const decrementButton = document.createElement('button');
    decrementButton.textContent = 'Decrement';
    decrementButton.onclick = () => {
        count--; // 更新状态
        p.textContent = `Count: ${count}`; // 手动更新 DOM
    };
    div.appendChild(decrementButton);

    return div;
}

// 2. 纯 JavaScript 消息切换
function createVanillaToggleMessage() {
    let isVisible = true; // 内部状态

    const div = document.createElement('div');
    div.className = 'state-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 消息切换';
    div.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = 'This message is visible!';
    div.appendChild(p);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Hide Message';
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
    div.appendChild(toggleButton);

    return div;
}

// 渲染到 DOM
vanillaRoot.appendChild(createVanillaCounter());
vanillaRoot.appendChild(createVanillaToggleMessage());