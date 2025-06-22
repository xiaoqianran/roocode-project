// vanilla-example.js
// 纯 JavaScript 模拟 Context 示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 模拟全局状态 (Context)
const VanillaGlobalState = {
    theme: 'light',
    user: { name: 'Guest', isAuthenticated: false },
    subscribers: {
        theme: [],
        user: []
    },
    setTheme: function(newTheme) {
        this.theme = newTheme;
        this.subscribers.theme.forEach(callback => callback(this.theme));
    },
    setUser: function(newUser) {
        this.user = newUser;
        this.subscribers.user.forEach(callback => callback(this.user));
    },
    subscribe: function(type, callback) {
        if (this.subscribers[type]) {
            this.subscribers[type].push(callback);
        }
    },
    unsubscribe: function(type, callback) {
        if (this.subscribers[type]) {
            this.subscribers[type] = this.subscribers[type].filter(sub => sub !== callback);
        }
    }
};

// 2. 消费全局状态的组件
function createVanillaThemedButton() {
    const button = document.createElement('button');
    button.textContent = `Themed Button (${VanillaGlobalState.theme} theme)`;
    button.className = `button-${VanillaGlobalState.theme}`;

    const updateButton = (newTheme) => {
        button.textContent = `Themed Button (${newTheme} theme)`;
        button.className = `button-${newTheme}`;
    };
    VanillaGlobalState.subscribe('theme', updateButton); // 订阅主题变化

    return button;
}

function createVanillaUserInfoDisplay() {
    const p = document.createElement('p');
    p.textContent = `User: ${VanillaGlobalState.user.name} (${VanillaGlobalState.user.isAuthenticated ? 'Authenticated' : 'Not Authenticated'})`;

    const updateUserInfo = (newUser) => {
        p.textContent = `User: ${newUser.name} (${newUser.isAuthenticated ? 'Authenticated' : 'Not Authenticated'})`;
    };
    VanillaGlobalState.subscribe('user', updateUserInfo); // 订阅用户变化

    return p;
}

// 3. 中间组件
function createVanillaToolbar() {
    const div = document.createElement('div');
    div.className = 'toolbar';
    div.appendChild(createVanillaThemedButton());
    div.appendChild(createVanillaUserInfoDisplay());
    return div;
}

// 4. 根组件 (模拟 Provider)
function createVanillaApp() {
    const div = document.createElement('div');

    // 主题部分
    const themeCard = document.createElement('div');
    themeCard.className = 'context-card';
    const h3Theme = document.createElement('h3');
    h3Theme.textContent = '纯 JavaScript 主题 Context';
    themeCard.appendChild(h3Theme);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Theme';
    toggleButton.addEventListener('click', () => {
        const newTheme = VanillaGlobalState.theme === 'light' ? 'dark' : 'light';
        VanillaGlobalState.setTheme(newTheme);
    });
    themeCard.appendChild(toggleButton);
    themeCard.appendChild(createVanillaToolbar());
    div.appendChild(themeCard);

    div.appendChild(document.createElement('hr'));

    // 用户部分
    const userCard = document.createElement('div');
    userCard.className = 'context-card';
    const h3User = document.createElement('h3');
    h3User.textContent = '纯 JavaScript 用户 Context';
    userCard.appendChild(h3User);

    userCard.appendChild(createVanillaToolbar()); // 再次渲染 Toolbar，它会消费当前的用户 Context

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login as Bob';
    loginButton.addEventListener('click', () => {
        VanillaGlobalState.setUser({ name: 'Bob', isAuthenticated: true });
    });
    userCard.appendChild(loginButton);

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', () => {
        VanillaGlobalState.setUser({ name: 'Guest', isAuthenticated: false });
    });
    userCard.appendChild(logoutButton);
    div.appendChild(userCard);

    return div;
}

// 渲染到 DOM
vanillaRoot.appendChild(createVanillaApp());

// 注意：在纯 JS 中，需要手动管理订阅和取消订阅，以避免内存泄漏。
// 在实际应用中，这会变得非常复杂。