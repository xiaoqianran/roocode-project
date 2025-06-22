// vanilla-example.js
// 纯 JavaScript 性能优化示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 模拟手动 DOM 更新优化 (避免不必要的重绘)
function createVanillaOptimizedCounter() {
    let count = 0;
    let textInput = '';

    const div = document.createElement('div');
    div.className = 'optimization-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 手动优化 DOM 更新';
    div.appendChild(h3);

    const pCount = document.createElement('p');
    pCount.textContent = `Count: ${count}`;
    div.appendChild(pCount);

    const incrementButton = document.createElement('button');
    incrementButton.textContent = 'Increment Count';
    incrementButton.addEventListener('click', () => {
        count++;
        pCount.textContent = `Count: ${count}`; // 只更新需要改变的部分
        console.log('Vanilla: Count updated.');
    });
    div.appendChild(incrementButton);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type to trigger unrelated updates';
    input.addEventListener('input', (e) => {
        textInput = e.target.value;
        // 这里的输入不会导致计数器重新渲染，因为它们是独立的 DOM 元素
        console.log('Vanilla: Text input changed.');
    });
    div.appendChild(input);

    return div;
}

// 2. 模拟记忆化计算 (手动缓存结果)
function createVanillaExpensiveCalculationComponent() {
    let num1 = 1;
    let num2 = 2;
    let cachedResult = null;
    let lastNums = { num1: -1, num2: -1 };

    const div = document.createElement('div');
    div.className = 'optimization-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 记忆化计算';
    div.appendChild(h3);

    const pNum1 = document.createElement('p');
    pNum1.textContent = `Num1: ${num1}`;
    div.appendChild(pNum1);

    const pNum2 = document.createElement('p');
    pNum2.textContent = `Num2: ${num2}`;
    div.appendChild(pNum2);

    const pResult = document.createElement('p');
    div.appendChild(pResult);

    function calculateExpensiveResult() {
        if (num1 !== lastNums.num1 || num2 !== lastNums.num2 || cachedResult === null) {
            console.log('Vanilla: Calculating expensive result...');
            let result = 0;
            for (let i = 0; i < 50000000; i++) { // 模拟昂贵的计算
                result += num1 * num2;
            }
            cachedResult = result;
            lastNums = { num1, num2 };
        }
        pResult.textContent = `Expensive Result: ${cachedResult}`;
    }

    const incrementNum1Button = document.createElement('button');
    incrementNum1Button.textContent = 'Increment Num1';
    incrementNum1Button.addEventListener('click', () => {
        num1++;
        pNum1.textContent = `Num1: ${num1}`;
        calculateExpensiveResult();
    });
    div.appendChild(incrementNum1Button);

    const incrementNum2Button = document.createElement('button');
    incrementNum2Button.textContent = 'Increment Num2';
    incrementNum2Button.addEventListener('click', () => {
        num2++;
        pNum2.textContent = `Num2: ${num2}`;
        calculateExpensiveResult();
    });
    div.appendChild(incrementNum2Button);

    const triggerRenderButton = document.createElement('button');
    triggerRenderButton.textContent = 'Trigger Unrelated Render (OFF)';
    let triggerState = false;
    triggerRenderButton.addEventListener('click', () => {
        triggerState = !triggerState;
        triggerRenderButton.textContent = `Trigger Unrelated Render (${triggerState ? 'ON' : 'OFF'})`;
        // 模拟一个不影响计算结果的 DOM 更新，验证记忆化是否生效
        console.log('Vanilla: Unrelated render triggered.');
    });
    div.appendChild(triggerRenderButton);

    const pLog = document.createElement('p');
    pLog.textContent = 'Check console for "Calculating expensive result..." logs.';
    div.appendChild(pLog);

    calculateExpensiveResult(); // 初始计算

    return div;
}

// 3. 模拟懒加载 (动态加载 JS 文件)
function createVanillaLazyLoadingExample() {
    const div = document.createElement('div');
    div.className = 'optimization-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 懒加载示例';
    div.appendChild(h3);

    const lazyContainer = document.createElement('div');
    div.appendChild(lazyContainer);

    const button = document.createElement('button');
    button.textContent = 'Show Lazy Loaded Content';
    button.addEventListener('click', () => {
        if (lazyContainer.children.length === 0) { // 避免重复加载
            button.textContent = 'Loading Lazy Content...';
            // 动态创建 script 标签加载 JS 文件
            const script = document.createElement('script');
            script.src = 'VanillaLazyContent.js'; // 假设 VanillaLazyContent.js 存在
            script.onload = () => {
                // 文件加载完成后，调用其中定义的函数来渲染内容
                if (typeof window.renderVanillaLazyContent === 'function') {
                    lazyContainer.appendChild(window.renderVanillaLazyContent());
                    button.textContent = 'Hide Lazy Loaded Content';
                }
            };
            document.head.appendChild(script);
        } else {
            lazyContainer.innerHTML = ''; // 隐藏内容
            button.textContent = 'Show Lazy Loaded Content';
        }
    });
    div.appendChild(button);

    return div;
}

// 渲染到 DOM
vanillaRoot.appendChild(createVanillaOptimizedCounter());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaExpensiveCalculationComponent());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaLazyLoadingExample());