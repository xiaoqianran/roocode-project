// vanilla-example.js
// 纯 JavaScript 路由示例 (手动管理 URL 和内容)

const vanillaRoot = document.getElementById('vanilla-root');

// 页面内容函数
function getHomePageContent() {
    return `
        <div class="route-page">
            <h2>Home Page</h2>
            <p>Welcome to the home page!</p>
        </div>
    `;
}

function getAboutPageContent() {
    return `
        <div class="route-page">
            <h2>About Page</h2>
            <p>Learn more about us here.</p>
        </div>
    `;
}

function getUserProfileContent(userId) {
    return `
        <div class="route-page">
            <h2>User Profile Page</h2>
            <p>Viewing profile for user ID: ${userId}</p>
            <button id="vanilla-go-home">Go to Home</button>
        </div>
    `;
}

function getNotFoundPageContent() {
    return `
        <div class="route-page error-page">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    `;
}

// 路由逻辑
function renderContent() {
    const path = window.location.pathname;
    let content = '';

    if (path === '/') {
        content = getHomePageContent();
    } else if (path === '/about') {
        content = getAboutPageContent();
    } else if (path.startsWith('/user/')) {
        const userId = path.split('/')[2];
        content = getUserProfileContent(userId);
    } else {
        content = getNotFoundPageContent();
    }

    vanillaRoot.innerHTML = content;

    // 为动态添加的按钮添加事件监听器
    if (path.startsWith('/user/')) {
        const goHomeButton = document.getElementById('vanilla-go-home');
        if (goHomeButton) {
            goHomeButton.addEventListener('click', () => {
                navigateTo('/');
            });
        }
    }
}

// 导航函数 (使用 History API)
function navigateTo(path) {
    window.history.pushState({}, path, path);
    renderContent();
}

// 监听浏览器历史变化 (前进/后退按钮)
window.addEventListener('popstate', renderContent);

// 初始渲染
renderContent();

// 创建导航链接
const navDiv = document.createElement('div');
navDiv.className = 'routing-card';
const h3 = document.createElement('h3');
h3.textContent = '纯 JavaScript 路由示例';
navDiv.appendChild(h3);

const navUl = document.createElement('ul');
navUl.innerHTML = `
    <li><a href="/" onclick="event.preventDefault(); navigateTo('/')">Home</a></li>
    <li><a href="/about" onclick="event.preventDefault(); navigateTo('/about')">About</a></li>
    <li><a href="/user/123" onclick="event.preventDefault(); navigateTo('/user/123')">User 123</a></li>
    <li><a href="/user/456" onclick="event.preventDefault(); navigateTo('/user/456')">User 456</a></li>
    <li><a href="/non-existent" onclick="event.preventDefault(); navigateTo('/non-existent')">Non-Existent Page</a></li>
`;
navDiv.appendChild(navUl);

// 将导航添加到 body 的顶部
document.body.insertBefore(navDiv, document.querySelector('.example-container'));