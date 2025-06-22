// vanilla-example.js
// 纯 JavaScript 模拟 Hooks 示例

const vanillaRoot = document.getElementById('vanilla-root');

// 模拟一个外部 API
const VanillaChatAPI = {
    subscribeToFriendStatus: (friendId, callback) => {
        console.log(`Vanilla: Subscribing to friend ${friendId} status.`);
        const isOnline = friendId % 2 === 0; // 偶数 ID 在线
        setTimeout(() => callback({ isOnline }), 1000);
        return () => console.log(`Vanilla: Unsubscribing from friend ${friendId} status.`);
    },
    unsubscribeFromFriendStatus: (friendId, callback) => {
        console.log(`Vanilla: Unsubscribing from friend ${friendId} status.`);
    }
};

// 1. 模拟 useState (通过闭包和手动 DOM 更新)
function createVanillaCounter() {
    let count = 0;
    const div = document.createElement('div');
    div.className = 'hook-card';

    const h3 = document.createElement('h3');
    h3.textContent = '模拟 useState (计数器)';
    div.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = `Count: ${count}`;
    div.appendChild(p);

    const button = document.createElement('button');
    button.textContent = 'Increment';
    button.addEventListener('click', () => {
        count++;
        p.textContent = `Count: ${count}`; // 手动更新 DOM
    });
    div.appendChild(button);

    return div;
}

// 2. 模拟 useEffect (通过函数返回清理函数)
function createVanillaFriendStatus(friendId) {
    const div = document.createElement('div');
    div.className = 'hook-card';

    const h3 = document.createElement('h3');
    h3.textContent = `模拟 useEffect (朋友状态 ${friendId})`;
    div.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = 'Loading...';
    div.appendChild(p);

    let cleanupFn = () => {}; // 存储清理函数

    // 模拟 useEffect 的副作用逻辑
    const setupEffect = () => {
        console.log(`Vanilla useEffect: Subscribing to friend ${friendId}`);
        const handleStatusChange = (status) => {
            p.textContent = `Friend ${friendId} is ${status.isOnline ? 'Online' : 'Offline'}`;
        };

        const unsubscribe = VanillaChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
        cleanupFn = () => {
            console.log(`Vanilla useEffect: Cleaning up subscription for friend ${friendId}`);
            unsubscribe();
        };
    };

    // 初始运行副作用
    setupEffect();

    // 返回 DOM 元素和清理函数，以便外部管理
    return {
        element: div,
        cleanup: cleanupFn
    };
}

// 3. 模拟 useContext (通过全局对象或手动传递)
const VanillaThemeContext = {
    theme: 'light' // 默认值
};

function createVanillaThemedButton(theme) {
    const button = document.createElement('button');
    button.className = `button-${theme}`;
    button.textContent = `Themed Button (${theme} theme)`;
    return button;
}

// 4. 模拟 useRef (直接获取 DOM 引用)
function createVanillaTextInputWithFocusButton() {
    const div = document.createElement('div');
    div.className = 'hook-card';

    const h3 = document.createElement('h3');
    h3.textContent = '模拟 useRef (DOM 访问)';
    div.appendChild(h3);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Focus me!';
    div.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Focus the input';
    button.addEventListener('click', () => {
        input.focus(); // 直接访问 DOM 元素
    });
    div.appendChild(button);

    return div;
}

// 5. 模拟 useCallback (手动记忆化函数)
function createVanillaParentComponentWithCallback() {
    let count = 0;
    let text = '';
    let memoizedCallback = () => {}; // 存储记忆化回调

    const div = document.createElement('div');
    div.className = 'hook-card';

    const h3 = document.createElement('h3');
    h3.textContent = '模拟 useCallback';
    div.appendChild(h3);

    const pCount = document.createElement('p');
    pCount.textContent = `Parent Count: ${count}`;
    div.appendChild(pCount);

    const incrementButton = document.createElement('button');
    incrementButton.textContent = 'Increment Parent Count';
    incrementButton.addEventListener('click', () => {
        count++;
        pCount.textContent = `Parent Count: ${count}`;
        // 重新创建记忆化回调，如果依赖改变
        memoizedCallback = createMemoizedCallback(count);
    });
    div.appendChild(incrementButton);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type to re-render parent';
    input.addEventListener('input', (e) => {
        text = e.target.value;
        // 模拟父组件重新渲染，但不影响记忆化回调
    });
    div.appendChild(input);

    // 初始创建记忆化回调
    memoizedCallback = createMemoizedCallback(count);

    const childButton = document.createElement('button');
    childButton.textContent = 'Execute Memoized Callback';
    childButton.addEventListener('click', memoizedCallback);
    div.appendChild(childButton);

    return div;
}

// 模拟 useCallback 的记忆化逻辑
let lastCount = -1;
let cachedCallback = null;
function createMemoizedCallback(currentCount) {
    if (currentCount !== lastCount || cachedCallback === null) {
        console.log('Vanilla: Callback recreated. Count:', currentCount);
        cachedCallback = () => {
            console.log('Vanilla: Callback executed. Count:', currentCount);
        };
        lastCount = currentCount;
    }
    return cachedCallback;
}


// 6. 模拟 useMemo (手动记忆化计算结果)
function createVanillaExpensiveCalculationComponent() {
    let num1 = 1;
    let num2 = 2;
    let cachedResult = null;
    let lastNums = { num1: -1, num2: -1 };

    const div = document.createElement('div');
    div.className = 'hook-card';

    const h3 = document.createElement('h3');
    h3.textContent = '模拟 useMemo';
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
            for (let i = 0; i < 10000000; i++) { // 模拟昂贵的计算
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

    calculateExpensiveResult(); // 初始计算

    return div;
}


// 7. 模拟自定义 Hook (useWindowWidth)
function createVanillaWindowWidthDisplay() {
    const div = document.createElement('div');
    div.className = 'hook-card';

    const h3 = document.createElement('h3');
    h3.textContent = '模拟自定义 Hook (useWindowWidth)';
    div.appendChild(h3);

    const p = document.createElement('p');
    div.appendChild(p);

    const handleResize = () => {
        p.textContent = `Window Width: ${window.innerWidth}px`;
    };

    // 模拟 useEffect 的挂载和卸载
    function mount() {
        window.addEventListener('resize', handleResize);
        handleResize(); // 初始设置
        p.textContent += ' (Resize your browser window to see the effect.)';
    }

    function unmount() {
        window.removeEventListener('resize', handleResize);
    }

    return {
        element: div,
        mount: mount,
        unmount: unmount
    };
}


// 渲染到 DOM
vanillaRoot.appendChild(createVanillaCounter());
vanillaRoot.appendChild(document.createElement('hr'));

// 渲染 FriendStatus
const friendStatus1 = createVanillaFriendStatus(1);
vanillaRoot.appendChild(friendStatus1.element);
const friendStatus2 = createVanillaFriendStatus(2);
vanillaRoot.appendChild(friendStatus2.element);
vanillaRoot.appendChild(document.createElement('hr'));

// 渲染 ThemedButton
const themedButtonLight = createVanillaThemedButton(VanillaThemeContext.theme);
vanillaRoot.appendChild(themedButtonLight);
VanillaThemeContext.theme = 'dark'; // 模拟 Context 变化
const themedButtonDark = createVanillaThemedButton(VanillaThemeContext.theme);
vanillaRoot.appendChild(themedButtonDark);
vanillaRoot.appendChild(document.createElement('hr'));

vanillaRoot.appendChild(createVanillaTextInputWithFocusButton());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaParentComponentWithCallback());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaExpensiveCalculationComponent());
vanillaRoot.appendChild(document.createElement('hr'));

const windowWidthDisplay = createVanillaWindowWidthDisplay();
vanillaRoot.appendChild(windowWidthDisplay.element);
windowWidthDisplay.mount(); // 手动调用挂载逻辑

// 在实际应用中，需要一个机制来在组件卸载时调用 cleanup 函数
// 例如，当 friendStatus1 或 friendStatus2 的 DOM 元素被移除时
// friendStatus1.cleanup();
// friendStatus2.cleanup();
// windowWidthDisplay.unmount();