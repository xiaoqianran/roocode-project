// vanilla-example.js
// 纯 JavaScript 组件示例

// 1. 模拟函数组件
function createWelcomeMessage(name) {
    const div = document.createElement('div');
    div.className = 'component-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 函数式模块';
    div.appendChild(h3);

    const p1 = document.createElement('p');
    p1.textContent = `Hello, ${name}!`;
    div.appendChild(p1);

    const p2 = document.createElement('p');
    p2.textContent = 'This is a simple functional module.';
    div.appendChild(p2);

    return div;
}

// 2. 模拟类组件 (使用 IIFE 和闭包模拟私有状态和生命周期)
function createClock() {
    const div = document.createElement('div');
    div.className = 'component-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 类式模块';
    div.appendChild(h3);

    const p1 = document.createElement('p');
    div.appendChild(p1);

    let timerID;

    function updateTime() {
        p1.textContent = `Current time: ${new Date().toLocaleTimeString()}`;
    }

    // 模拟 componentDidMount
    function mount() {
        updateTime(); // Initial display
        timerID = setInterval(updateTime, 1000);
        const p2 = document.createElement('p');
        p2.textContent = 'This is a class-like module with internal state.';
        div.appendChild(p2);
    }

    // 模拟 componentWillUnmount
    function unmount() {
        clearInterval(timerID);
    }

    // 返回一个包含 DOM 元素和生命周期方法的对象
    return {
        element: div,
        mount: mount,
        unmount: unmount
    };
}

// 3. 组合模块并渲染到 DOM
const vanillaRoot = document.getElementById('vanilla-root');

// 渲染 WelcomeMessage
const welcomeElement = createWelcomeMessage("Vanilla JS Learner");
vanillaRoot.appendChild(welcomeElement);

// 渲染 Clock
const clockModule = createClock();
vanillaRoot.appendChild(clockModule.element);
clockModule.mount(); // 手动调用挂载逻辑

// 在实际应用中，你可能需要一个更复杂的机制来管理这些模块的生命周期，
// 例如在页面卸载时调用 unmount。
// window.addEventListener('beforeunload', () => {
//     clockModule.unmount();
// });