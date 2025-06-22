// vanilla-example.js
// 纯 JavaScript 条件渲染示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. if/else 语句条件渲染
function createVanillaUserGreeting() {
    const p = document.createElement('p');
    p.textContent = 'Welcome back, user!';
    return p;
}

function createVanillaGuestGreeting() {
    const p = document.createElement('p');
    p.textContent = 'Please sign up.';
    return p;
}

function createVanillaGreeting(isLoggedIn) {
    if (isLoggedIn) {
        return createVanillaUserGreeting();
    }
    return createVanillaGuestGreeting();
}

// 2. 逻辑 && 运算符 (手动检查长度)
function createVanillaMailbox(unreadMessages) {
    const div = document.createElement('div');
    div.className = 'conditional-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 逻辑 && 运算符';
    div.appendChild(h3);

    const h1 = document.createElement('h1');
    h1.textContent = 'Hello!';
    div.appendChild(h1);

    if (unreadMessages.length > 0) {
        const h2 = document.createElement('h2');
        h2.textContent = `You have ${unreadMessages.length} unread messages.`;
        div.appendChild(h2);
    } else {
        const p = document.createElement('p');
        p.textContent = 'No unread messages.';
        div.appendChild(p);
    }
    return div;
}

// 3. 三元运算符 (手动切换文本和按钮)
function createVanillaLoginControl() {
    let isLoggedIn = false;
    const div = document.createElement('div');
    div.className = 'conditional-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 三元运算符';
    div.appendChild(h3);

    const greetingContainer = document.createElement('div');
    div.appendChild(greetingContainer);

    const button = document.createElement('button');
    div.appendChild(button);

    const statusP = document.createElement('p');
    div.appendChild(statusP);

    function updateUI() {
        // 更新问候语
        greetingContainer.innerHTML = ''; // 清空旧内容
        greetingContainer.appendChild(createVanillaGreeting(isLoggedIn));

        // 更新按钮文本
        button.textContent = isLoggedIn ? 'Logout' : 'Login';

        // 更新状态文本
        statusP.textContent = `Status: ${isLoggedIn ? 'Logged In' : 'Logged Out'}`;
    }

    button.addEventListener('click', () => {
        isLoggedIn = !isLoggedIn;
        updateUI();
    });

    updateUI(); // 初始渲染
    return div;
}

// 4. 阻止组件渲染 (手动移除 DOM 元素)
function createVanillaWarningBanner(warn) {
    const div = document.createElement('div');
    div.className = 'warning-banner';
    div.textContent = 'Warning!';
    div.style.display = warn ? 'block' : 'none'; // 控制显示/隐藏
    return div;
}

function createVanillaPage() {
    let showWarning = true;
    const div = document.createElement('div');
    div.className = 'conditional-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 阻止渲染';
    div.appendChild(h3);

    const warningBanner = createVanillaWarningBanner(showWarning);
    div.appendChild(warningBanner);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Hide Warning';
    toggleButton.addEventListener('click', () => {
        showWarning = !showWarning;
        warningBanner.style.display = showWarning ? 'block' : 'none';
        toggleButton.textContent = showWarning ? 'Hide Warning' : 'Show Warning';
    });
    div.appendChild(toggleButton);

    return div;
}


// 渲染到 DOM
const vanillaMessages = ['Vanilla', 'JS', 'Example'];
const vanillaEmptyMessages = [];

vanillaRoot.appendChild(createVanillaLoginControl());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaMailbox(vanillaMessages));
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaMailbox(vanillaEmptyMessages));
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaPage());