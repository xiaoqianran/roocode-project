// vanilla-example.js
// 纯 JavaScript 模拟错误边界示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 模拟错误边界 (使用 try...catch 和手动 DOM 替换)
function createVanillaErrorBoundary(childComponentCreator, showDetails = false) {
    const container = document.createElement('div');
    container.className = 'error-boundary-section';

    let childElement;
    try {
        childElement = childComponentCreator();
        container.appendChild(childElement);
    } catch (error) {
        console.error("Vanilla Error Caught an error:", error);
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'error-fallback';
        const h3 = document.createElement('h3');
        h3.textContent = 'Something went wrong.';
        fallbackDiv.appendChild(h3);
        const p = document.createElement('p');
        p.textContent = 'We are sorry for the inconvenience.';
        fallbackDiv.appendChild(p);

        if (showDetails) {
            const details = document.createElement('details');
            details.style.whiteSpace = 'pre-wrap';
            details.textContent = error.toString();
            fallbackDiv.appendChild(details);
        }
        container.appendChild(fallbackDiv);
    }
    return container;
}

// 2. 会抛出错误的组件
function createVanillaBuggyCounter() {
    let count = 0;
    const div = document.createElement('div');
    div.className = 'error-card';

    const h4 = document.createElement('h4');
    h4.textContent = 'Buggy Counter';
    div.appendChild(h4);

    const pCount = document.createElement('p');
    pCount.textContent = `Count: ${count}`;
    div.appendChild(pCount);

    const button = document.createElement('button');
    button.textContent = 'Increment';
    button.addEventListener('click', () => {
        count++;
        pCount.textContent = `Count: ${count}`;
        if (count === 5) {
            // 模拟一个错误
            throw new Error('I crashed at count 5! (Vanilla JS)');
        }
    });
    div.appendChild(button);

    const pInfo = document.createElement('p');
    pInfo.textContent = 'Click until count reaches 5 to see the error.';
    div.appendChild(pInfo);

    return div;
}

// 组合示例
const vanillaAppContainer = document.createElement('div');
vanillaRoot.appendChild(vanillaAppContainer);

const h2 = document.createElement('h2');
h2.textContent = '纯 JavaScript 错误处理示例';
vanillaAppContainer.appendChild(h2);

// 使用模拟错误边界
const section1 = document.createElement('div');
section1.className = 'error-boundary-section';
const h3_1 = document.createElement('h3');
h3_1.textContent = '使用 try...catch 捕获错误';
section1.appendChild(h3_1);
section1.appendChild(createVanillaErrorBoundary(createVanillaBuggyCounter, true));
vanillaAppContainer.appendChild(section1);

vanillaAppContainer.appendChild(document.createElement('hr'));

// 没有错误边界的组件
const section2 = document.createElement('div');
section2.className = 'error-boundary-section';
const h3_2 = document.createElement('h3');
h3_2.textContent = '没有 try...catch 的组件 (会使整个应用崩溃)';
section2.appendChild(h3_2);
const p2 = document.createElement('p');
p2.textContent = '下面的计数器没有错误处理，点击到 5 时会使整个页面崩溃。';
section2.appendChild(p2);
try {
    section2.appendChild(createVanillaBuggyCounter()); // 这个组件没有被 try...catch 包裹
} catch (error) {
    // 这里的 catch 只能捕获到 createVanillaBuggyCounter 内部同步抛出的错误
    // 对于事件处理函数中异步抛出的错误，需要更复杂的全局错误处理
    console.error("Vanilla Global Catch (should not happen for event errors):", error);
    const globalErrorDiv = document.createElement('div');
    globalErrorDiv.className = 'error-fallback';
    globalErrorDiv.textContent = 'A global error occurred during initial render!';
    section2.appendChild(globalErrorDiv);
}
vanillaAppContainer.appendChild(section2);

vanillaAppContainer.appendChild(document.createElement('hr'));

// 多个模拟错误边界
const section3 = document.createElement('div');
section3.className = 'error-boundary-section';
const h3_3 = document.createElement('h3');
h3_3.textContent = '多个模拟错误边界';
section3.appendChild(h3_3);
const flexContainer = document.createElement('div');
flexContainer.style.display = 'flex';
flexContainer.style.gap = '20px';
flexContainer.appendChild(createVanillaErrorBoundary(createVanillaBuggyCounter));
flexContainer.appendChild(createVanillaErrorBoundary(createVanillaBuggyCounter));
section3.appendChild(flexContainer);
vanillaAppContainer.appendChild(section3);

// 全局错误处理 (捕获未被 try...catch 捕获的运行时错误)
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Vanilla Global Error Handler:", message, source, lineno, colno, error);
    const globalErrorDisplay = document.createElement('div');
    globalErrorDisplay.className = 'global-error-display';
    globalErrorDisplay.textContent = `Global Error: ${message}`;
    document.body.appendChild(globalErrorDisplay);
    return true; // 返回 true 阻止默认的浏览器错误报告
};