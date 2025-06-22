# Next.js 文件系统路由 (File System Routing)

## 概述

Next.js 的核心特性之一是其基于文件系统的路由。这意味着您无需手动配置路由，只需在 `pages` 目录下创建文件和文件夹，Next.js 就会自动将它们映射为对应的路由。这与传统 React 应用中通常需要使用 `react-router-dom` 等库进行手动路由配置形成了鲜明对比。

## 与传统 React 路由的对比

| 特性         | 传统 React 应用 (如 CRA + React Router) | Next.js 应用                                   |
| :----------- | :-------------------------------------- | :--------------------------------------------- |
| **路由配置** | 需要手动安装和配置路由库 (如 `react-router-dom`)，通过组件 (如 `<BrowserRouter>`, `<Route>`) 定义路由。 | 基于文件系统自动生成路由，无需手动配置。       |
| **页面加载** | 客户端路由，首次加载后，页面切换在客户端完成，需要 JavaScript 加载。 | 默认支持服务器端渲染 (SSR) 或静态站点生成 (SSG)，首次加载更快，SEO 友好。 |
| **代码分割** | 需要手动配置 Webpack 或使用 `React.lazy()` 和 `<Suspense>` 进行代码分割。 | 默认对每个页面进行代码分割，只加载当前页面所需的 JavaScript。 |
| **链接**     | 使用 `<Link>` 组件 (来自路由库) 进行导航。 | 使用 Next.js 内置的 `next/link` 组件进行导航，支持预加载。 |

## Next.js 路由规则

在 Next.js 中，`pages` 目录是路由的根目录。

### 1. 索引路由 (Index Routes)

*   `pages/index.js` -> `/`
*   `pages/dashboard/index.js` -> `/dashboard`

### 2. 嵌套路由 (Nested Routes)

*   `pages/about.js` -> `/about`
*   `pages/products/list.js` -> `/products/list`

### 3. 动态路由 (Dynamic Routes)

使用方括号 `[]` 来创建动态路由。

*   `pages/posts/[id].js` -> `/posts/1`, `/posts/abc`
    *   在页面组件中，可以通过 `useRouter` 钩子获取 `id` 参数：`router.query.id`。
*   `pages/users/[username]/profile.js` -> `/users/john/profile`

### 4. 捕获所有路由 (Catch-all Routes)

使用三个点 `...` 来捕获所有子路径。

*   `pages/docs/[[...slug]].js` -> `/docs/a`, `/docs/a/b`, `/docs/a/b/c`
    *   `slug` 将是一个数组，例如 `['a', 'b', 'c']`。
    *   双层方括号 `[[...slug]]` 表示可选的捕获所有路由，即 `/docs` 也能匹配。

## 导航

Next.js 提供了 `next/link` 组件用于客户端导航。

```jsx
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>欢迎来到首页</h1>
      <Link href="/about">
        <a>关于我们</a>
      </Link>
      <br />
      <Link href="/posts/123">
        <a>查看文章 123</a>
      </Link>
    </div>
  );
}

export default HomePage;
```

`Link` 组件会自动处理客户端导航，并且在生产环境中会预加载链接指向的页面，从而提高用户体验。

## 总结

文件系统路由是 Next.js 提高开发效率和性能的关键特性。它简化了路由配置，并与 Next.js 的其他优化功能（如代码分割、预渲染）无缝集成，使得构建高性能的 React 应用变得更加容易。