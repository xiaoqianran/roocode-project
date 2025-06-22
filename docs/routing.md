# 路由 (Routing)

在单页应用 (SPA) 中，**路由**是指根据不同的 URL 路径渲染不同的 UI 组件。与传统的多页应用不同，SPA 在用户导航时不会重新加载整个页面，而是动态地更新页面内容。在 React 应用中，通常会使用第三方库（如 React Router）来实现客户端路由。

## 为什么使用路由？

路由对于构建具有多个“页面”或视图的单页应用至关重要。它允许你：

*   **模拟多页应用体验**: 用户可以在不刷新页面的情况下在不同视图之间切换。
*   **管理 URL 状态**: 将应用的 UI 状态与 URL 同步，使得用户可以通过 URL 分享特定视图。
*   **实现导航**: 提供清晰的导航结构，引导用户在应用中移动。

## 路由与传统 HTML/CSS/JS 的对比

在传统的 Web 开发中，页面跳转通常通过 `<a href="...">` 标签实现，每次点击都会导致浏览器重新加载整个页面。或者，你可以使用 `window.location` 和 `history.pushState()` 等浏览器 API 手动管理历史记录和 URL，但这会非常复杂。

### 传统 Web 路由示例

在传统 Web 应用中，每次导航都会触发一次完整的页面加载：

```html
<!-- index.html -->
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about.html">About</a></li>
    </ul>
</nav>
<div id="content">
    <!-- 页面内容会根据 URL 变化 -->
</div>

<!-- about.html -->
<!-- 另一个独立的 HTML 文件 -->
```

### React 客户端路由示例

在 React 中，路由库会在不重新加载页面的情况下，根据 URL 路径动态地渲染不同的 React 组件。

请参考 [`react-learning-spec.md`](react-learning-spec.md:396-417) 中的 React Router 伪代码示例：

```pseudocode
IMPORT { BrowserRouter as Router, Route, Link, Switch } FROM 'react-router-dom';

FUNCTION App()
    RETURN (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>

            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
END FUNCTION
```

## React 路由的实现方式 (以 React Router 为例)

React Router 是 React 生态系统中最流行的路由库。它提供了一组组件，用于声明式地定义应用的路由。

### 1. 安装 React Router

首先，你需要在你的 React 项目中安装 React Router：

```bash
npm install react-router-dom
# 或者
yarn add react-router-dom
```

### 2. 导入路由组件

从 `react-router-dom` 中导入所需的组件：

```jsx
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
```

*   `BrowserRouter` (通常别名为 `Router`): 使用 HTML5 历史 API (`pushState`, `replaceState` 和 `popstate` 事件) 来保持 UI 与 URL 同步。
*   `Route`: 用于定义路由规则，当 URL 与 `path` 匹配时，渲染指定的组件。
*   `Link`: 用于创建导航链接，它会阻止浏览器默认的页面刷新行为。
*   `Switch`: 渲染与当前 URL 匹配的第一个 `<Route>` 或 `<Redirect>`。

### 3. 定义路由

在你的根组件（通常是 `App` 组件）中，使用 `Router` 组件包裹你的整个应用，然后使用 `Route` 组件来定义不同的路径和对应的组件。

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// 假设这是你的页面组件
function Home() {
    return <h2>Home Page</h2>;
}

function About() {
    return <h2>About Page</h2>;
}

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>

            {/* Switch 会确保只有一个 Route 被渲染 */}
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/"> {/* 精确匹配 / 路径 */}
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
```

### 4. 嵌套路由

React Router 也支持嵌套路由，允许你在父组件内部定义子路由。

### 5. 编程式导航

除了 `Link` 组件，你还可以使用 `useHistory` Hook（在 React Router v5 中）或 `useNavigate` Hook（在 React Router v6 中）进行编程式导航。

```jsx
import { useNavigate } from 'react-router-dom';

function DashboardButton() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard'); // 导航到 /dashboard 路径
    };

    return (
        <button onClick={goToDashboard}>Go to Dashboard</button>
    );
}
```

## 总结

路由是构建复杂单页 React 应用不可或缺的一部分。通过使用像 React Router 这样的库，你可以轻松地管理 URL 路径与 UI 组件之间的映射，从而提供流畅的用户导航体验，并模拟传统多页应用的结构。